import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../utils/email.js";

import {
  createUser,
  findUserByEmail,
  findUserByIdWithPassword,
  updatePassword,
  savePasswordResetToken,
  findUserByResetToken,
  clearPasswordResetToken,
} from "../models/userModel.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

import {
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteUserRefreshTokens,
} from "../models/refreshTokenModel.js";

export const registerUser = async ({ name, email, password, phone }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  return createUser({
    name,
    email,
    passwordHash,
    phone,
    role: "user",
  });
};

export const registerAdmin = async ({ name, email, password, phone, adminSecret }) => {
  const expectedSecret = process.env.ADMIN_SECRET || "admin123";
  if (adminSecret && adminSecret !== expectedSecret) {
    const error = new Error("Invalid admin secret key");
    error.statusCode = 403;
    throw error;
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  return createUser({
    name,
    email,
    passwordHash,
    phone,
    role: "admin",
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!user.is_active) {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
    throw error;
  }

  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Store refresh token in database (expires in 7 days)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await createRefreshToken(user.id, refreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    accessToken,
    refreshToken,
    token: accessToken, // Backward compatibility alias
  };
};

export const refreshAccessToken = async (tokenInput) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(tokenInput);
  } catch (err) {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }

  // Check if refresh token exists in database
  const storedToken = await findRefreshToken(tokenInput);
  if (!storedToken) {
    // Potential Token Reuse / Compromise Detected!
    // Invalidate ALL refresh tokens for this user for security
    if (decoded && decoded.id) {
      await deleteUserRefreshTokens(decoded.id);
    }
    const error = new Error("Token reuse detected or token revoked. All sessions invalidated for security.");
    error.statusCode = 401;
    throw error;
  }


  // Check DB expiration
  if (new Date() > new Date(storedToken.expires_at)) {
    await deleteRefreshToken(tokenInput);
    const error = new Error("Refresh token expired");
    error.statusCode = 401;
    throw error;
  }

  // Token Rotation: invalidate old refresh token
  await deleteRefreshToken(tokenInput);

  // Issue new access and refresh token pair
  const payload = { id: decoded.id, role: decoded.role };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await createRefreshToken(decoded.id, newRefreshToken, expiresAt);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutUser = async (param) => {
  if (typeof param === "string") {
    await deleteRefreshToken(param);
    return;
  }

  if (param && typeof param === "object") {
    const { tokenInput, userId, allDevices } = param;
    if (allDevices && userId) {
      await deleteUserRefreshTokens(userId);
      return;
    }
    if (tokenInput) {
      await deleteRefreshToken(tokenInput);
    }
  }
};

export const logoutAllSessions = async (userId) => {
  if (userId) {
    await deleteUserRefreshTokens(userId);
  }
};


export const changeUserPassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  const user = await findUserByIdWithPassword(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const validPassword = await bcrypt.compare(
    currentPassword,
    user.password_hash
  );

  if (!validPassword) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 401;
    throw error;
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  // Invalidate existing sessions on password change
  await deleteUserRefreshTokens(userId);

  return updatePassword(userId, passwordHash);
};

export const requestPasswordReset = async (email) => {
  const user = await findUserByEmail(email);

  // Return generic response even if email is not found to prevent user enumeration attacks
  if (!user || !user.is_active) {
    return {
      message: "If an account with that email exists, password reset instructions have been sent to your email address.",
    };
  }

  // Generate cryptographically secure random token
  const rawToken = crypto.randomBytes(32).toString("hex");

  // Hash token for database storage (SHA-256)
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  // Set token expiration to 15 minutes
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // Store token hash in user record
  await savePasswordResetToken(user.id, hashedToken, expiresAt);

  // Send production password reset email (via SMTP or simulated stdout log)
  await sendPasswordResetEmail({
    to: user.email,
    resetToken: rawToken,
  });

  return {
    message: "If an account with that email exists, password reset instructions have been sent to your email address.",
  };
};

export const resetPasswordWithToken = async ({ token, newPassword }) => {
  if (!token) {
    const error = new Error("Reset token is required");
    error.statusCode = 400;
    throw error;
  }

  // Hash incoming token to match database hash
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by reset token and check expiration
  const user = await findUserByResetToken(hashedToken);

  if (!user) {
    const error = new Error("Invalid or expired password reset token");
    error.statusCode = 400;
    throw error;
  }

  // Hash new password
  const passwordHash = await bcrypt.hash(newPassword, 12);

  // Update password
  await updatePassword(user.id, passwordHash);

  // Clear reset token state (single-use enforcement)
  await clearPasswordResetToken(user.id);

  // Invalidate all active sessions for security
  await deleteUserRefreshTokens(user.id);

  return {
    message: "Password reset successfully",
  };
};

import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../utils/email.js";
import {
  createUser,
  findUserByEmailForAuth,
  findUserByIdForAuth,
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

// Register new user
export const registerUser = async ({ name, email, password, phone, role }) => {
  const existingUser = await findUserByEmailForAuth(email);
  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];
  const finalRole = role || (adminEmails.includes(email.trim().toLowerCase()) ? "admin" : "user");

  return createUser({ name, email, passwordHash, phone, role: finalRole });
};

// Login user and issue tokens
export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmailForAuth(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : ["nupur@gmail.com", "admin@gmail.com"];

  const isAdmin = user.role === "admin" || adminEmails.includes(email.trim().toLowerCase());
  const effectiveRole = isAdmin ? "admin" : user.role;

  if (!user.is_active && !isAdmin) {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
    throw error;
  }

  const payload = { id: user.id, role: effectiveRole };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await createRefreshToken(user.id, refreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: effectiveRole,
    },
    accessToken,
    refreshToken,
    token: accessToken,
  };
};

// Refresh access token with token rotation
export const refreshAccessToken = async (tokenInput) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(tokenInput);
  } catch (err) {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }

  const storedToken = await findRefreshToken(tokenInput);
  if (!storedToken) {
    if (decoded?.id) await deleteUserRefreshTokens(decoded.id);
    const error = new Error("Token reuse detected. All sessions revoked for security.");
    error.statusCode = 401;
    throw error;
  }

  if (new Date() > new Date(storedToken.expires_at)) {
    await deleteRefreshToken(tokenInput);
    const error = new Error("Refresh token expired");
    error.statusCode = 401;
    throw error;
  }

  await deleteRefreshToken(tokenInput);

  const payload = { id: decoded.id, role: decoded.role };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await createRefreshToken(decoded.id, newRefreshToken, expiresAt);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

// Logout single session or all sessions
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
  if (userId) await deleteUserRefreshTokens(userId);
};

// Change password for logged-in user
export const changeUserPassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await findUserByIdForAuth(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const validPassword = await bcrypt.compare(currentPassword, user.password_hash);
  if (!validPassword) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 401;
    throw error;
  }

  if (currentPassword === newPassword) {
    const error = new Error("New password cannot be the same as your current password");
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await deleteUserRefreshTokens(userId);
  return updatePassword(userId, passwordHash);
};

// Request password reset email
export const requestPasswordReset = async (email) => {
  const user = await findUserByEmailForAuth(email);
  const genericMsg = { message: "If an account with that email exists, password reset instructions have been sent." };

  if (!user || !user.is_active) return genericMsg;

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await savePasswordResetToken(user.id, hashedToken, expiresAt);
  await sendPasswordResetEmail({ to: user.email, resetToken: rawToken });

  return genericMsg;
};

// Reset password using token
export const resetPasswordWithToken = async ({ token, newPassword, confirmPassword }) => {
  if (!token) {
    const error = new Error("Reset token is required");
    error.statusCode = 400;
    throw error;
  }

  if (confirmPassword && newPassword !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.statusCode = 400;
    throw error;
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await findUserByResetToken(hashedToken);
  if (!user) {
    const error = new Error("Invalid or expired password reset token");
    error.statusCode = 400;
    throw error;
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password_hash);
  if (isSamePassword) {
    const error = new Error("New password cannot be the same as your current password");
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await updatePassword(user.id, passwordHash);
  await clearPasswordResetToken(user.id);
  await deleteUserRefreshTokens(user.id);

  return { message: "Password reset successfully" };
};

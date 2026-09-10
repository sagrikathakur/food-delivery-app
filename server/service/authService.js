import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail,
  findUserByIdWithPassword,
  updatePassword,
} from "../models/userModel.js";

import { generateToken } from "../utils/jwt.js";

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

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    token,
  };
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

  return updatePassword(userId, passwordHash);
};
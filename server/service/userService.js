import {
  findUserById,
  updateUser,
  deleteUser,
} from "../models/userModel.js";

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export const updateUserProfile = async (userId, { name, phone }) => {
  const user = await updateUser(userId, { name, phone });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export const deleteUserProfile = async (userId) => {
  const user = await deleteUser(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};
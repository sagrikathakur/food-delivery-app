import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  getSystemStats,
} from "../models/userModel.js";

// Fetch all registered users
export const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// Change user role (user <-> admin)
export const changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await updateUserRole(id, role);
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Toggle active status (enable / disable)
export const toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const updatedUser = await updateUserStatus(id, isActive);
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Fetch simple dashboard metrics
export const fetchDashboardStats = async (req, res, next) => {
  try {
    const stats = await getSystemStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

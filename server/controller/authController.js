import * as authService from "../service/authService.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.loginUser(req.body);
    res.status(200).json({
      message: "Login successful",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    await authService.changeUserPassword({
      userId: req.user.id,
      ...req.body,
    });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

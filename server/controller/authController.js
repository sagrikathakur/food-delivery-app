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

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};


export const login = async (req, res, next) => {
  try {
    const data = await authService.loginUser(req.body);

    // Set refresh token in HttpOnly cookie for web security
    res.cookie("refreshToken", data.refreshToken, COOKIE_OPTIONS);

    res.status(200).json({
      message: "Login successful",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const tokenInput =
      req.body?.refreshToken ||
      req.headers["x-refresh-token"] ||
      (req.headers.cookie &&
        req.headers.cookie
          .split("; ")
          .find((row) => row.startsWith("refreshToken="))
          ?.split("=")[1]);

    if (!tokenInput) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const tokens = await authService.refreshAccessToken(tokenInput);

    // Update HttpOnly cookie with rotated refresh token
    res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);

    res.status(200).json({
      message: "Access token refreshed successfully",
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const tokenInput =
      req.body?.refreshToken ||
      req.headers["x-refresh-token"] ||
      (req.headers.cookie &&
        req.headers.cookie
          .split("; ")
          .find((row) => row.startsWith("refreshToken="))
          ?.split("=")[1]);

    const allDevices = Boolean(req.body?.allDevices || req.query?.allDevices === "true");
    const userId = req.user?.id;

    await authService.logoutUser({
      tokenInput,
      userId,
      allDevices,
    });

    // Clear refresh token cookie
    res.clearCookie("refreshToken", CLEAR_COOKIE_OPTIONS);

    res.status(200).json({
      message: allDevices ? "Logged out from all devices successfully" : "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await authService.logoutAllSessions(userId);

    // Clear refresh token cookie
    res.clearCookie("refreshToken", CLEAR_COOKIE_OPTIONS);

    res.status(200).json({ message: "Logged out from all devices successfully" });
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

export const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.requestPasswordReset(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPasswordWithToken({
      token: req.body.token,
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};



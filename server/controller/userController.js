import * as userService from "../service/userService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUserProfile(req.user.id, req.body);
    res.status(200).json({
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteUserProfile(req.user.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

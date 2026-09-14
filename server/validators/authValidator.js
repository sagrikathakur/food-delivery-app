import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(6, "Must be at least 6 characters")
  .regex(/[A-Z]/, "Requires an uppercase letter")
  .regex(/[a-z]/, "Requires a lowercase letter")
  .regex(/[0-9]/, "Requires a number")
  .regex(/[^A-Za-z0-9]/, "Requires a symbol");

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: strongPasswordSchema,
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().optional(),
});

export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
  allDevices: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: strongPasswordSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: strongPasswordSchema,
});






import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

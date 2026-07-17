import { z } from "zod";

import { REGISTRATION_ROLES } from "@/types/auth";

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters.")
  .regex(
    /[A-Za-z]/,
    "Password must contain at least one letter.",
  )
  .regex(
    /\d/,
    "Password must contain at least one number.",
  );

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required."),
});

export const registerRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  password: passwordSchema,

  role: z.enum(REGISTRATION_ROLES),
});

export const registerFormSchema =
  registerRequestSchema
    .extend({
      confirmPassword: z
        .string()
        .min(1, "Confirm your password."),
    })
    .refine(
      (values) =>
        values.password === values.confirmPassword,
      {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      },
    );

export type LoginFormValues =
  z.infer<typeof loginSchema>;

export type RegisterFormValues =
  z.infer<typeof registerFormSchema>;
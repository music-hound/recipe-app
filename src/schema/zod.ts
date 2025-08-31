import { object, string } from "zod"
import { z } from "zod";
 
export const signInSchema = object({
  email: string()
    .nonempty("ZOD: Email is required")
    .email("ZOD: Invalid email"),
  password: string()
    .nonempty("ZOD: Password is required")
    .min(6, "ZOD: Password must be more than 8 characters")
    .max(32, "ZOD: Password must be less than 32 characters"),
});

export const ingredientSchema = object({
  name: string().min(1, "ZOD: Название обязательно"),

  category: z.enum([
    "VEGETABLES",
  "FRUITS",
  "MEAT",
  "DAIRY",
  "SPICES",
  "OTHER",
  ]),

  unit: z.enum([
    "GRAMS",
    "KILOGRAMS",
    "LITERS",
    "MILLILITERS",
    "PIECES",
  ]),

  pricePerUnit: z
  .number()
  .min(0, "ZOD: Цена должна быть больше или равна 0")
  .nullable()
  .refine(
      (val) => val === null || typeof val === "number",
      { message: "Цена должна быть числом" }
    ),

  description: string().optional(),

})

import { z } from "zod";

export const FavoriteCoinSchema = z.object({
    symbol: z.string().min(1),
    min: z
        .string()
        .min(1)
        .transform((val) => Number(val))
        .refine((num) => !isNaN(num), {
            message: "Must be a valid number",
        })
        .refine((num) => num > 0, {
            message: "Must be greater than 0",
        }),

    max: z
        .string()
        .min(1)
        .transform((val) => Number(val))
        .refine((num) => !isNaN(num), {
            message: "Must be a valid number",
        })
        .refine((num) => num > 0, {
            message: "Must be greater than 0",
        }),
});

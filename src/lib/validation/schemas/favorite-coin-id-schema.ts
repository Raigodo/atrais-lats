import { z } from "zod";

export const FavoriteCoinIdSchema = z.object({
    symbol: z.string().min(1),
});

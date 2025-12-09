"use server";

import { FavoriteCoins } from "../dao/favorite-coin";
import { revalidatePath } from "next/cache";
import { getServerUserId } from "../helper/session";
import { FavoriteCoinIdSchema } from "../validation/schemas/favorite-coin-id-schema";

export const deleteFavoriteAction: (symbol: string) => Promise<void> = async (symbol) => {
    const validated = FavoriteCoinIdSchema.safeParse({ symbol });
    if (!validated.success) {
        return;
    }

    const userId = await getServerUserId();

    await FavoriteCoins.delete({ userId: userId, symbol: validated.data.symbol });

    revalidatePath("/favorites");
};

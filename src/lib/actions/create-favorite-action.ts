"use server";

import { FavoriteCoinSchema } from "../validation/schemas/favorite-coin-schema";
import z from "zod";
import {
    createAuthErrorResponse,
    createDataErrorResponse,
    createSuccessResponse,
} from "../helper/response";
import { BaseServerAction } from "@/src/components/forms/base-form-props";
import { FavoriteCoins } from "../dao/favorite-coin";
import { revalidatePath } from "next/cache";
import { getServerUser } from "../helper/session";

export const createFavoriteAction: BaseServerAction<z.infer<typeof FavoriteCoinSchema>> = async (
    prevState,
    data
) => {
    const validated = FavoriteCoinSchema.safeParse(Object.fromEntries(data.entries()));
    if (!validated.success) return createDataErrorResponse(validated);

    const user = await getServerUser();
    if (!user) return createAuthErrorResponse();

    await FavoriteCoins.create({ userId: user.id, ...validated.data });

    revalidatePath("/favorites");

    return createSuccessResponse();
};

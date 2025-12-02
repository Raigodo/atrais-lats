"use server";

import { FavoriteCoinSchema } from "../validation/schemas/favorite-coin-schema";
import z from "zod";
import { prepareErrorSummary } from "../validation/error-helper";
import { BaseServerAction } from "@/src/components/form/base-form-props";
import { Users } from "../dao/users";
import { FavoriteCoins } from "../dao/favorite-coin";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const editFavoriteAction: BaseServerAction<z.infer<typeof FavoriteCoinSchema>> = async (
    prevState,
    data
) => {
    const validated = FavoriteCoinSchema.safeParse(Object.fromEntries(data.entries()));

    if (!validated.success) {
        return {
            success: false,
            errors: prepareErrorSummary(validated),
        };
    }

    const session = await getServerSession();
    const user = await Users.findById(session?.user.email!);

    if (!user) {
        return { success: false, errors: { _global: ["User not authenticated"] } };
    }

    await FavoriteCoins.update({ userId: user.id, ...validated.data });

    revalidatePath("/favorites");

    return {
        success: true,
        errors: {},
    };
};

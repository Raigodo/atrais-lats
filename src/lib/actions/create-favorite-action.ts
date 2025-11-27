"use server";

import { FavoriteCoinSchema } from "../validation/schemas/favorite-coin-schema";
import z from "zod";
import { prepareErrorSummary } from "../validation/error-helper";
import { BaseServerAction } from "@/src/components/form/base-form-props";

export const createFavoriteAction: BaseServerAction<z.infer<typeof FavoriteCoinSchema>> = async (
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

    return {
        success: true,
        errors: {},
    };
};

import { cacheLife, cacheTag } from "next/cache";
import { FavoriteCoinModel } from "../models/favorite-coin-model";
import { CoinModel } from "../models/coin-model";
import { CoinMarketCap } from "../external-api/coin-market-cap";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const Coins = {
    getLatestListings: async (): Promise<CoinModel[]> => {
        "use cache";
        cacheTag("coins");
        cacheLife({ revalidate: 360 });

        const currencies = await CoinMarketCap.getLatestCoinListings();

        return currencies;
    },

    getFavoriteCoins: async (userId: string): Promise<FavoriteCoinModel[]> => {
        "use cache";
        cacheTag("coins");
        cacheTag("favorite-coins");

        const coins = await prisma.favoriteCryptoCoin.findMany({
            where: {
                userId,
            },
        });

        return [];
    },
};

import { cacheTag } from "next/cache";
import { FavoriteCoinModel } from "../models/favorite-coin-model";
import { prisma } from "../clients/prisma";

export const FavoriteCoins = {
    exists: async (userId: string, symbol: string) => {
        // "use cache";
        // cacheTag("users");
        // cacheTag("coins");
        // cacheTag(`favorite-coins:${userId}`);

        return prisma.favoriteCryptoCoin
            .findFirst({
                where: { userId, symbol },
            })
            .then((result) => !!result);
    },

    findById: async (userId: string, symbol: string) => {
        // "use cache";
        // cacheTag("users");
        // cacheTag("coins");
        // cacheTag(`favorite-coins:${userId}`);

        return prisma.favoriteCryptoCoin.findFirst({
            where: { userId, symbol },
        });
    },

    all: async (userId: string): Promise<FavoriteCoinModel[]> => {
        // "use cache";
        // cacheTag("users");
        // cacheTag("coins");
        // cacheTag(`favorite-coins:${userId}`);

        const userFavorites = await prisma.favoriteCryptoCoin.findMany({
            where: {
                userId,
            },
            include: { coin: true },
        });

        return userFavorites.map((favorite: any) => ({
            ...favorite.coin,
            min: favorite.min,
            max: favorite.max,
        }));
    },

    create: async ({
        symbol,
        userId,
        min,
        max,
    }: {
        symbol: string;
        userId: string;
        min: number;
        max: number;
    }) => {
        console.log({
            symbol,
            userId,
            min,
            max,
        });

        return prisma.favoriteCryptoCoin.create({
            data: {
                symbol,
                userId,
                min,
                max,
            },
        });
    },

    update: async ({
        symbol,
        userId,
        min,
        max,
    }: {
        symbol: string;
        userId: string;
        min: number;
        max: number;
    }) => {
        return prisma.favoriteCryptoCoin.updateMany({
            where: {
                symbol,
                userId,
            },
            data: {
                min,
                max,
            },
        });
    },

    delete: async ({ symbol, userId }: { symbol: string; userId: string }) => {
        return await prisma.favoriteCryptoCoin.deleteMany({
            where: {
                symbol,
                userId,
            },
        });
    },
};

import { revalidateTag } from "next/cache";
import { CoinModel } from "../../types/models/coin-model";
import { prisma } from "../clients/prisma";

export const Coins = {
    allCount: async (userId: string | null | undefined) => {
        // "use cache";
        // cacheTag("coins");
        // cacheLife({ revalidate: 360 });

        return prisma.cryptoCoin.count();
    },

    all: async (userId: string | null | undefined, page: number): Promise<CoinModel[]> => {
        // "use cache";
        // cacheTag("coins");
        // cacheLife({ revalidate: 360 });

        const windowSize = 5;
        const skip = (page - 1) * windowSize;

        const currencies = await prisma.cryptoCoin.findMany({
            take: windowSize,
            skip: skip,
            include: {
                favorites: userId
                    ? {
                          where: { userId },
                          select: { userId: true },
                      }
                    : undefined,
            },
        });

        return currencies.map(({ favorites, ...rest }) => ({
            ...rest,
            isFavorite: userId ? favorites.length > 0 : false,
        }));
    },

    updateAll: async (coins: CoinModel[]) => {
        return prisma
            .$transaction([
                prisma.$executeRawUnsafe(`
                    INSERT INTO "CryptoCoin" (symbol, price, "percentChange", name)
                    VALUES ${coins.map((c) => `('${c.symbol}', ${c.price}, ${c.percentChange}, '${c.name}')`).join(",")}
                    ON CONFLICT (symbol) DO UPDATE SET
                        price = EXCLUDED.price,
                        "percentChange" = EXCLUDED."percentChange"
                `),
            ])
            .then(() => {
                revalidateTag("coins", "max");
            });
    },
};

import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { CoinModel } from "../models/coin-model";
import { prisma } from "../clients/prisma";

export const Coins = {
    all: async (userId: string | null | undefined): Promise<CoinModel[]> => {
        // "use cache";
        // cacheTag("coins");
        // cacheLife({ revalidate: 360 });

        const currencies = await prisma.cryptoCoin.findMany({
            take: 40,
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

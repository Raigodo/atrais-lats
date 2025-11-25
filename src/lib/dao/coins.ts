import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { CoinModel } from "../models/coin-model";
import { CoinMarketCap } from "../external-api/coin-market-cap";
import { prisma } from "../clients/prisma";

export const Coins = {
    all: async (): Promise<CoinModel[]> => {
        "use cache";
        cacheTag("coins");
        cacheLife({ revalidate: 360 });

        const currencies = await CoinMarketCap.getLatestCoinListings();

        return currencies;
    },

    updateAll: async (coins: CoinModel[]) => {
        return prisma
            .$transaction([
                prisma.$executeRawUnsafe(`
                    INSERT INTO "CryptoCoin" (symbol, price, "percentChange", name)
                    VALUES ${coins.map((c) => `('${c.symbol}', ${c.price}, ${c.percentChange}, '${c.name}')`).join(",")}
                    ON CONFLICT (symbol) DO UPDATE SET
                        price = EXCLUDED.price,
                        "percentChange" = EXCLUDED."percentChange",
                `),
            ])
            .then(() => {
                revalidateTag("coins", "max");
            });
    },
};

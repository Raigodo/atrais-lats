import "dotenv/config";
import { revalidateTag } from "next/cache";
import { CoinMarketCap } from "@/src/lib/external-api/coin-market-cap";
import { Coins } from "@/src/lib/dao/coins";
import { NextResponse } from "next/server";
import { getNNotiffyQueue } from "@/src/lib/emailing";
import { prisma } from "@/src/lib/clients/prisma";
import { FavoriteCoins } from "@/src/lib/dao/favorite-coin";

export async function GET(request: Request) {
    console.log("Cron job");

    // const authHeader = request.headers.get("Authorization");
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const latestCoins = await CoinMarketCap.getLatestCoinListings();
    await Coins.updateAll(latestCoins);

    const toNotiffy = await FavoriteCoins.allToNotiffy();

    await Promise.all(
        toNotiffy.map(async (item) => {
            const priceState = item.price > item.max ? "high" : "low";
            const message = `${item.name} (${item.symbol}) price is ${priceState}!`;
            getNNotiffyQueue().enqueue({
                userId: (await prisma.user.findFirst())!.id,
                message,
            });
        })
    );

    revalidateTag("coins", "max");

    return NextResponse.json({ foo: "bar" });
}

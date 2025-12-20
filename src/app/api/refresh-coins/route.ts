import "dotenv/config";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { FavoriteCoins } from "@/src/lib/dao/favorite-coin";
import { NotifyFavoriteJobQueue } from "@/src/lib/clients/notify-favorite-job-queue";
import { CoinMarketCap } from "@/src/lib/clients/coin-market-cap";
import { Coins } from "@/src/lib/dao/coins";

export async function GET(request: Request) {
    // const authHeader = request.headers.get("Authorization");
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const latestCoins = await CoinMarketCap.getLatestCoinListings();
    // await Coins.updateAll(latestCoins);

    // const toNotiffy = await FavoriteCoins.allToNotiffy();

    // await Promise.all(
    //     toNotiffy.map(async (item) => {
    //         const priceState = item.price > item.max ? "high" : "low";
    //         const message = `${item.name} (${item.symbol}) price is ${priceState}!`;

    //         await NotifyFavoriteJobQueue.enqueue({
    //             symbol: item.symbol,
    //             userId: item.userId,
    //             message,
    //         });
    //     })
    // );

    revalidateTag("coins", "max");

    return NextResponse.json({ foo: "bar" });
}

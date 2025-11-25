import { NextResponse } from "next/server";
import "dotenv/config";
import { revalidateTag } from "next/cache";
import { CoinMarketCap } from "@/src/lib/external-api/coin-market-cap";
import { Coins } from "@/src/lib/dao/coins";

export async function GET(request: Request) {
    console.log("Cron job");

    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const latestCoins = await CoinMarketCap.getLatestCoinListings();
    await Coins.updateAll(latestCoins);

    revalidateTag("coins", "max");

    return NextResponse.json({ success: true, message: "Cron complete" });
}

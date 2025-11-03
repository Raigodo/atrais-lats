import "dotenv/config";
import { cacheLife } from "next/cache";
import { CoinModel } from "./models/coin-model";

export async function getLatestCoinListings(): Promise<CoinModel[]> {
    "use cache";
    cacheLife({ expire: 60 * 120 });

    console.log("fetch currencies");

    const response = await fetch(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20",
        {
            cache: "force-cache",
            headers: {
                "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY!,
            },
        }
    );

    const currencies: Record<string, any>[] = ((await response.json()) as any).data;

    const partialCoinList = currencies.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        price: coin.quote.USD.price,
        percent_change_1h: coin.quote.USD.percent_change_1h,
        isFavorite: coin.symbol == "BTC" ? true : false,
    }));

    return partialCoinList;
}

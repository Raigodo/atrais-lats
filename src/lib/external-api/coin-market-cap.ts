import "dotenv/config";
import { CoinModel } from "../models/coin-model";

export const CoinMarketCap = {
    getLatestCoinListings: async (): Promise<CoinModel[]> => {
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

        const timestamp = new Date();

        const partialCoinList = currencies.map((coin) => ({
            name: coin.name as string,
            symbol: coin.symbol as string,
            price: coin.quote.USD.price as number,
            percentChange: coin.quote.USD.percent_change_1h as number,
            isFavorite: coin.symbol == "BTC" ? true : false,
            timestamp: timestamp.toISOString(),
        }));

        return partialCoinList;
    },
};

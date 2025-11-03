import "dotenv/config";
import { FavoriteCoinModel } from "./models/favorite-coin-model";
import { cacheTag } from "next/cache";
import { getLatestCoinListings } from "./coin-market-cap-api";

export async function getFavoriteCoins(): Promise<FavoriteCoinModel[]> {
    "use cache";
    cacheTag("favorite-coins");

    const currencies = await getLatestCoinListings();

    const favoriteCoinSymbols = currencies
        .filter((coin) => coin.isFavorite)
        .map((coin) => coin.symbol);

    const favoriteCoins = currencies
        .filter((coin) => favoriteCoinSymbols.includes(coin.symbol))
        .map((coin) => ({
            ...coin,
            min: 0,
            max: 0,
        }));

    return favoriteCoins;
}

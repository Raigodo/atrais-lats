"use server";

import Pagination from "@/src/components/page/pagination";
import FavoriteCryptoTable from "@/src/components/tables/favorite-crypto-table";
import { Coins } from "@/src/lib/dao/coins";

async function Page() {
    const cryptoList = await Coins.getFavoriteCoins("user id");

    return (
        <div className="flex items-center justify-center p-8">
            <div className="border-x w-full max-w-7xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold">Tavu favorītu saraksts!</h1>
                </div>

                <FavoriteCryptoTable items={cryptoList} />
                <Pagination />
            </div>
        </div>
    );
}

export default Page;

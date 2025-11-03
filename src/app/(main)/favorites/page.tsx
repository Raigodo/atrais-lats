"use server";

import Pagination from "@/src/components/page/pagination";
import FavoriteCryptoTable from "@/src/components/tables/favorite-crypto-table";
import { getFavoriteCoins } from "@/src/lib/get-favorite-coins";

async function Page() {
    const cryptoList = await getFavoriteCoins();

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

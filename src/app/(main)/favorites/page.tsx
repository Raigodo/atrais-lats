"use server";

import Pagination from "@/src/components/page/pagination";
import FavoriteCryptoTable from "@/src/components/tables/favorite-crypto-table";
import { FavoriteCoins } from "@/src/lib/dao/favorite-coin";
import { getServerSession } from "next-auth";

async function Page() {
    const session = await getServerSession();
    const cryptoList = await FavoriteCoins.all(session?.user.email!);

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

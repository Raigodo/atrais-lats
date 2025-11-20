"use server";

import Pagination from "@/src/components/page/pagination";
import CryptoTable from "@/src/components/tables/crypto-table";
import { Coins } from "@/src/lib/dao/coins";
import { getServerSession } from "next-auth";

export default async function Page() {
    const cryptoList = await Coins.getLatestListings();
    const session = await getServerSession();
    console.log("page", session);

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 w-full max-w-7xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold">Šodienas Kripto valūtu cenas!</h1>
                </div>
                <CryptoTable items={cryptoList} />
                <Pagination />
            </div>
        </div>
    );
}

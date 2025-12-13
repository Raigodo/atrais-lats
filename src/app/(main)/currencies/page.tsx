"use server";

import Pagination from "@/src/components/page/pagination";
import CryptoTable from "@/src/components/tables/crypto-table";
import { Coins } from "@/src/lib/dao/coins";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession();
    const cryptoList = await Coins.all(session?.user.email);

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 w-full max-w-7xl">
                <div>{new Date().getTime()}</div>
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold">Todays ctrypto currency prices!</h1>
                </div>
                <CryptoTable items={cryptoList} />
                <Pagination />
            </div>
        </div>
    );
}

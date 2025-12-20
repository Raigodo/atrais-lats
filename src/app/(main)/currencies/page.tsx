"use server";

import PaginatedView from "@/src/components/page/paginated-view";
import CryptoTable from "@/src/components/tables/crypto-table";
import { getServerSession } from "next-auth";
import { Coins } from "@/src/lib/dao/coins";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const currentPage = parseInt((await searchParams).page || "1");
    const session = await getServerSession();
    const cryptoList = await Coins.all(session?.user.email, currentPage);

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 w-full max-w-7xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold">Todays ctrypto currency prices!</h1>
                </div>
                <PaginatedView path="/currencies" currentPage={currentPage} lastPage={10}>
                    <CryptoTable items={cryptoList} />
                </PaginatedView>
            </div>
        </div>
    );
}

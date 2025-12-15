"use client";

import { CoinModel } from "@/src/types/models/coin-model";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { useModalManager } from "../dialogs/modal-manager-context-provider";
import { ModalKeys } from "../dialogs/modal-keys";
import { useSession } from "next-auth/react";

function CryptoTable({ items }: { items: CoinModel[] }) {
    const { openModal } = useModalManager();

    function onCoinClicked(coin: CoinModel) {
        openModal({
            key: ModalKeys.CREATE_FAVORITE,
            bag: { price: coin.price, name: coin.name, symbol: coin.symbol },
        });
    }

    const session = useSession();

    return (
        <Table>
            <TableCaption>Todays ctrypto currency prices</TableCaption>

            <TableHeader>
                <TableRow className="border-border2/50 hover:bg-transparent">
                    <TableHead>Name</TableHead>
                    <TableHead className="w-32">Symbol</TableHead>
                    <TableHead className="w-48">Price</TableHead>
                    <TableHead className="w-48">Percent change 1h/%</TableHead>
                    <TableHead className="w-24">Favorite</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {items.map((coin, index) => (
                    <TableRow key={coin.symbol ?? index} onClick={() => onCoinClicked(coin)}>
                        <TableCell>{coin.name}</TableCell>

                        <TableCell>{coin.symbol}</TableCell>

                        <TableCell>{Number(coin.price).toFixed(4)}</TableCell>

                        <TableCell
                            className={coin.percentChange < 0 ? "text-red-600" : "text-green-600"}
                        >
                            {Number(coin.percentChange).toFixed(2)}%
                        </TableCell>

                        <TableCell>{coin.isFavorite ? "★" : "☆"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default CryptoTable;

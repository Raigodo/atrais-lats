import { ModalKeys } from "../dialogs/modal-keys";
import { useModalManager } from "../dialogs/modal-manager-context-provider";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { FavoriteCoinModel } from "@/src/lib/models/favorite-coin-model";

function FavoriteCryptoTable({ items }: { items: FavoriteCoinModel[] }) {
    const { openModal } = useModalManager();

    function onCoinClicked(coin: FavoriteCoinModel) {
        openModal({
            key: ModalKeys.EDIT_FAVORITE,
            bag: {
                price: coin.price,
                name: coin.name,
                symbol: coin.symbol,
                min: coin.min,
                max: coin.max,
            },
        });
    }

    return (
        <Table>
            <TableCaption>Tavu favorītu saraksts</TableCaption>

            <TableHeader>
                <TableRow className="border-border2/50">
                    <TableHead>Nosaukums</TableHead>
                    <TableHead className="w-32">Simbols</TableHead>
                    <TableHead className="w-48">Cena</TableHead>
                    <TableHead className="w-48">Izmaiņa 1h/%</TableHead>
                    <TableHead className="w-48">Min. vērtība</TableHead>
                    <TableHead className="w-48">Max. vērtība</TableHead>
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

                        <TableCell>{coin.min}</TableCell>

                        <TableCell>{coin.max}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default FavoriteCryptoTable;

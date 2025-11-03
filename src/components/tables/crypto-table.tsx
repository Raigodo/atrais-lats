import { CoinModel } from "@/src/lib/models/coin-model";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

function CryptoTable({ items }: { items: CoinModel[] }) {
    return (
        <Table>
            <TableCaption>Šodienas Kripto valūtu cenas</TableCaption>

            <TableHeader>
                <TableRow className="border-border2/50 hover:bg-transparent">
                    <TableHead>Nosaukums</TableHead>
                    <TableHead className="w-32">Simbols</TableHead>
                    <TableHead className="w-48">Cena</TableHead>
                    <TableHead className="w-48">Izmaiņa 1h/%</TableHead>
                    <TableHead className="w-24">Favorīts</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {items.map((crypto, index) => (
                    <TableRow key={crypto.symbol ?? index}>
                        <TableCell>{crypto.name}</TableCell>

                        <TableCell>{crypto.symbol}</TableCell>

                        <TableCell>{Number(crypto.price).toFixed(4)}</TableCell>

                        <TableCell
                            className={
                                crypto.percent_change_1h < 0 ? "text-red-600" : "text-green-600"
                            }
                        >
                            {Number(crypto.percent_change_1h).toFixed(2)}%
                        </TableCell>

                        <TableCell>{crypto.isFavorite ? "★" : "☆"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default CryptoTable;

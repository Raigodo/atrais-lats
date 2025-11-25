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
                {items.map((crypto, index) => (
                    <TableRow key={crypto.symbol ?? index}>
                        <TableCell>{crypto.name}</TableCell>

                        <TableCell>{crypto.symbol}</TableCell>

                        <TableCell>{Number(crypto.price).toFixed(4)}</TableCell>

                        <TableCell
                            className={crypto.percentChange < 0 ? "text-red-600" : "text-green-600"}
                        >
                            {Number(crypto.percentChange).toFixed(2)}%
                        </TableCell>

                        <TableCell>{crypto.min}</TableCell>

                        <TableCell>{crypto.max}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default FavoriteCryptoTable;

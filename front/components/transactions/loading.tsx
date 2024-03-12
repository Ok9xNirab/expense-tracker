import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function TransactionLoading() {
  return (
    <TableBody>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-8 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-full" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-8 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

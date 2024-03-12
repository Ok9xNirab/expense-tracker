import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CollectionPagination from "../ui/custom/pagination";
import Collection from "@/types/Collection";
import { requestAPI } from "@/utils/session";
import RowActions from "./actions";
import Transaction from "@/types/Transaction";

export default async function TransactionsTable({
  currentPage,
  tab,
  filter,
}: {
  currentPage: number;
  tab: string;
  filter: string;
}) {
  const numberFormat = new Intl.NumberFormat();
  const transactions = await getTransactions(currentPage);

  async function getTransactions(page = 1) {
    return await requestAPI<Collection<Transaction>>(
      `/transactions?page=${page}${tab !== "all" ? `&type=${tab}` : ""}${
        filter !== "current_month" ? `&filter=${filter}` : ""
      }`
    );
  }

  return (
    <TableBody>
      {"message" in transactions ? (
        <TableRow className="hover:bg-transparent">
          <TableCell
            className="text-center py-20 font-medium text-red-400"
            colSpan={4}
          >
            {transactions.message || "Something went Wrong!"}
          </TableCell>
        </TableRow>
      ) : (
        <>
          {transactions.data.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell
                className="text-center py-20 font-medium text-zinc-400"
                colSpan={5}
              >
                No transactions exists!
              </TableCell>
            </TableRow>
          )}
          {transactions.data.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.remarks ?? "-"}
              </TableCell>
              <TableCell>
                <Badge
                  className="capitalize"
                  variant={
                    transaction.type === "income" ? "secondary" : "outline"
                  }
                >
                  {transaction.source.name}
                </Badge>
              </TableCell>
              <TableCell>
                {transaction.amount ? (
                  <span
                    className={
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    ${numberFormat.format(transaction.amount)}
                  </span>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{transaction.created_at}</TableCell>
              <TableCell className="text-right">
                <RowActions transaction={transaction} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={5}>
              <div className="pt-6">
                <CollectionPagination meta={transactions.meta} />
              </div>
            </TableCell>
          </TableRow>
        </>
      )}
    </TableBody>
  );
}

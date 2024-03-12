import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardHeader } from "@/components/ui/card";
import SectionTitle from "@/components/ui/custom/section-title";
import { Suspense } from "react";
import SearchParams from "@/types/SearchParams";
import TransactionsTable from "@/components/transactions/table";
import Filter from "@/components/ui/custom/filter";
import AddDialog from "@/components/transactions/add-dialog";
import TransactionLoading from "@/components/transactions/loading";

export const metadata: Metadata = {
  title: "Transactions - Expense Tracker",
};

export default function TransactionsPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 mt-8">
        <SectionTitle>Transactions</SectionTitle>
        <div className="flex items-center gap-4">
          <Filter name="transactions" />
          <AddDialog />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Remarks</TableHead>
                <TableHead className="w-[200px]">Source</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
                <TableHead className="w-[200px]">Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <Suspense
              key={new Date().toISOString()}
              fallback={<TransactionLoading />}
            >
              <TransactionsTable
                currentPage={
                  searchParams.page ? parseInt(searchParams.page as string) : 1
                }
                filter={
                  (searchParams.filter as string | undefined) ?? "current_month"
                }
                tab={(searchParams.tab as string) ?? "all"}
              />
            </Suspense>
          </Table>
        </CardHeader>
      </Card>
    </div>
  );
}

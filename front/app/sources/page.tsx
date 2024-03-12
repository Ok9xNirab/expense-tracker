import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardHeader } from "@/components/ui/card";
import SectionTitle from "@/components/ui/custom/section-title";
import { Suspense } from "react";
import SourcesTable from "@/components/sources/table";
import SourcesLoading from "@/components/sources/loading";
import SearchParams from "@/types/SearchParams";
import AddSourceDialog from "@/components/sources/add-dialog";
import Filter from "@/components/ui/custom/filter";

export const metadata: Metadata = {
  title: "Sources - Expense Tracker",
};

export default function SourcesPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 mt-8">
        <SectionTitle>Sources</SectionTitle>
        <div className="flex items-center gap-4">
          <Filter name="sources" />
          <AddSourceDialog />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[200px]">Type</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <Suspense
              key={new Date().toISOString()}
              fallback={<SourcesLoading />}
            >
              <SourcesTable
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

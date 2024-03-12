import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CollectionPagination from "../ui/custom/pagination";
import Collection from "@/types/Collection";
import Source from "@/types/Source";
import { requestAPI } from "@/utils/session";
import RowActions from "./actions";

export default async function SourcesTable({
  currentPage,
  tab,
  filter,
}: {
  currentPage: number;
  tab: string;
  filter: string;
}) {
  const numberFormat = new Intl.NumberFormat();
  const sources = await getSources(currentPage);

  async function getSources(page = 1) {
    return await requestAPI<Collection<Source>>(
      `/sources?page=${page}${tab !== "all" ? `&type=${tab}` : ""}${
        filter !== "current_month" ? `&filter=${filter}` : ""
      }`
    );
  }

  return (
    <TableBody>
      {"message" in sources ? (
        <TableRow>
          <TableCell
            className="text-center py-20 font-medium text-red-400"
            colSpan={4}
          >
            {sources.message || "Something went Wrong!"}
          </TableCell>
        </TableRow>
      ) : (
        <>
          {sources.data.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell
                className="text-center py-20 font-medium text-zinc-400"
                colSpan={4}
              >
                No sources exists!
              </TableCell>
            </TableRow>
          )}
          {sources.data.map((source) => (
            <TableRow key={source.id}>
              <TableCell className="font-medium">{source.name}</TableCell>
              <TableCell>
                <Badge
                  className="capitalize"
                  variant={source.type === "income" ? "secondary" : "outline"}
                >
                  {source.type}
                </Badge>
              </TableCell>
              <TableCell>
                {source.amount ? (
                  <span
                    className={
                      source.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    ${numberFormat.format(source.amount)}
                  </span>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <RowActions source={source} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={4}>
              <div className="pt-6">
                <CollectionPagination meta={sources.meta} />
              </div>
            </TableCell>
          </TableRow>
        </>
      )}
    </TableBody>
  );
}

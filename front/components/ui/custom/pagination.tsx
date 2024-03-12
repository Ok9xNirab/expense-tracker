"use client";
import { type Meta } from "@/types/Collection";
import { PropsWithChildren } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

type PropType = PropsWithChildren<{
  meta: Meta;
}>;

export default function CollectionPagination({ meta }: PropType) {
  const { last_page } = meta;
  const params = useSearchParams();

  let currentPage = parseInt(params.get("page") ?? "1");
  currentPage = currentPage < 1 ? 1 : currentPage;

  function getLinkURL(page: number) {
    let others = "";
    for (let [key, value] of params.entries()) {
      if (key !== "page") {
        others += `&${key}=${value}`;
      }
    }
    return `?page=${page}${others}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          href={getLinkURL(currentPage - 1)}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : undefined}
          className={
            currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
          }
        />
        <PaginationItem>
          <PaginationLink
            href={getLinkURL(currentPage - 1 <= 0 ? 1 : currentPage - 1)}
            isActive={currentPage === 1}
          >
            {currentPage - 1 <= 0 ? 1 : currentPage - 1}
          </PaginationLink>
        </PaginationItem>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationLink href={getLinkURL(currentPage)} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 1 <= last_page && (
          <PaginationItem>
            <PaginationLink href={getLinkURL(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 2 < last_page && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={getLinkURL(currentPage + 1)}
            aria-disabled={last_page === currentPage}
            tabIndex={last_page === currentPage ? -1 : undefined}
            className={
              last_page === currentPage
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

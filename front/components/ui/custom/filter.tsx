"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";

export default function Filter({ name }: { name: "sources" | "transactions" }) {
  const router = useRouter();
  const params = useSearchParams();
  return (
    <>
      <Tabs
        onValueChange={(value) =>
          router.push(
            `/${name}?page=1&tab=${value}${
              params.has("filter") ? `&filter=${params.get("filter")}` : ""
            }`
          )
        }
        defaultValue={params.has("tab") ? (params.get("tab") as string) : "all"}
        className="w-max"
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="outcome">Outcome</TabsTrigger>
        </TabsList>
      </Tabs>
      <Select
        onValueChange={(value) =>
          router.push(
            `/${name}?page=1&filter=${value}${
              params.has("tab") ? `&tab=${params.get("tab")}` : ""
            }`
          )
        }
        value={params.get("filter") ?? "current_month"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="This Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Current Day</SelectItem>
          <SelectItem value="current_month">This Month</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

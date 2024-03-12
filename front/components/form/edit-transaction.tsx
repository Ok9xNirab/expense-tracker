"use client";

import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { requestAPI } from "@/utils/session";
import Source from "@/types/Source";
import {
  useContext,
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import TransactionContext from "@/store/transaction-row";
import Transaction from "@/types/Transaction";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Collection from "@/types/Collection";

type ComponentProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type OptionType = {
  id: number;
  label: string;
};

const FormSchema = z.object({
  remarks: z.string().optional(),
  amount: z.string().min(1, {
    message: "Invalid Amount!",
  }),
  source: z.string().min(1, {
    message: "Please select source!",
  }),
});

export function EditTransaction({ setOpen }: ComponentProps) {
  const transactionCtx = useContext(TransactionContext);
  const { id, remarks, amount, source } = transactionCtx as Transaction;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      remarks: remarks ?? "",
      amount: amount.toString() ?? "",
      source: source.id.toString(),
    },
  });
  const router = useRouter();
  const [openSources, setOpenSources] = useState(false);
  const [sources, setSources] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSources([
      {
        id: source.id,
        label: source.name,
      },
    ]);
  }, []);

  async function getSources(query: string) {
    setLoading(true);
    const res = await requestAPI<Collection<Source>>(`/sources?q=${query}`);
    setLoading(false);
    if ("message" in res) {
      toast({
        title: res.message || "Something went Wrong!",
        variant: "destructive",
      });
      setSources([]);
      return;
    }
    const options: OptionType[] = [];
    res.data.forEach((source) =>
      options.push({
        id: source.id,
        label: source.name,
      })
    );
    setSources(options);
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await requestAPI<{ data: Source }>(`/transactions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_id: data.source,
        amount: data.amount,
        remarks: data.remarks ?? null,
      }),
    });
    if ("message" in res) {
      return toast({
        title: res.message || "Something went Wrong!",
        variant: "destructive",
      });
    }

    toast({
      title: "Transaction updated !",
    });

    setOpen(false);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="12" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Input placeholder="Just brought a coffe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Source</FormLabel>
              <Popover open={openSources} onOpenChange={setOpenSources}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? sources.find(
                            (source) => source.id.toString() === field.value
                          )?.label ?? "Select source"
                        : "Select source"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search source..."
                      className="h-9"
                      onChangeCapture={(e) =>
                        getSources((e.target as HTMLInputElement).value)
                      }
                    />
                    {loading || sources.length === 0 ? (
                      <div
                        className="py-6 text-center text-xs"
                        role="presentation"
                      >
                        {loading
                          ? "Loading ..."
                          : sources.length === 0 && "No sources found!"}
                      </div>
                    ) : (
                      <CommandGroup>
                        {sources.map((source) => (
                          <CommandItem
                            value={source.label}
                            key={source.id}
                            onSelect={() => {
                              form.setValue("source", source.id.toString());
                              setOpenSources(false);
                            }}
                          >
                            {source.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                source.id.toString() === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <ReloadIcon className="mr-2 animate-spin" />
          )}
          Update
        </Button>
      </form>
    </Form>
  );
}

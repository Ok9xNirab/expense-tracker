"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requestAPI } from "@/utils/session";
import Source from "@/types/Source";
import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type ComponentProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  type: z.enum(["income", "outcome"], {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_enum_value":
          return { message: "Invalid source selected!" };
        default:
          return { message: "Please select source!" };
      }
    },
  }),
});

export function AddSource({ setOpen }: ComponentProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await requestAPI<{ data: Source }>("/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    if ("message" in res) {
      return toast({
        title: res.message || "Something went Wrong!",
        variant: "destructive",
      });
    }

    toast({
      title: "Source created !",
    });

    setOpen(false);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Salary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="outcome">Outcome</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <ReloadIcon className="mr-2 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}

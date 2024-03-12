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
import { requestAPI } from "@/utils/session";
import Source from "@/types/Source";
import { useContext, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import SourceContext from "@/store/source-row";

type ComponentProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

export function EditSource({ setOpen }: ComponentProps) {
  const { id, name, type } = useContext(SourceContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
    },
  });
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await requestAPI<{ data: Source }>(`/sources/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        type,
      }),
    });
    if ("message" in res) {
      return toast({
        title: res.message || "Something went Wrong!",
        variant: "destructive",
      });
    }

    toast({
      title: "Source updated !",
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

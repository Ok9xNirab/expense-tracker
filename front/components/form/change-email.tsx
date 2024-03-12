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
import { useRouter } from "next/navigation";
import { requestAPI, updateUser } from "@/utils/session";
import User from "@/types/User";

const FormSchema = z.object({
  email: z.string().email(),
});

export default function ChangeEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      email,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await requestAPI<{ data: Pick<User, "email"> }>(
      "/update-email",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    if ("message" in res) {
      return toast({
        title: res.message || "Something went Wrong!",
        variant: "destructive",
      });
    }

    updateUser({
      email: data.email,
    });

    toast({
      title: "Email updated !",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@test.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <ReloadIcon className="mr-2 animate-spin" />
          )}
          Update Email
        </Button>
      </form>
    </Form>
  );
}

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
import { requestAPI } from "@/utils/session";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(3, "Password must contain at least 3 character(s)"),
    new_password: z
      .string()
      .min(3, "New Password must contain at least 3 character(s)"),
    new_password_confirmation: z
      .string()
      .min(3, "Confirm New Password must contain at least 3 character(s)"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New Password didn't match",
    path: ["confirm_password"],
  });

export default function ChangePasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await requestAPI<{ data: unknown }>("/change-password", {
      method: "PATCH",
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
      title: "Password changed !",
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <ReloadIcon className="mr-2 animate-spin" />
          )}
          Update Password
        </Button>
      </form>
    </Form>
  );
}

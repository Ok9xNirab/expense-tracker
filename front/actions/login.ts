"use server";

import Auth from "@/types/Auth";
import { cookies } from "next/headers";

export default async function Login(email: string, password: string) {
  const res = await fetch(process.env.API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json()) as Auth | { message: string };

  if (res.status === 422) {
    const error = data as { message: string };
    return {
      success: false,
      message: error.message,
    };
  }

  const user = data as Auth;

  cookies().set("token", user.token);
  cookies().set("user", JSON.stringify(user.user));

  return {
    success: true,
  };
}

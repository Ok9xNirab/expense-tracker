"use server";

import ErrorResponse from "@/types/ErrorResponse";
import User from "@/types/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isLoggedIn() {
  return cookies().get("token") ? true : false;
}

export async function getUser() {
  const user = cookies().get("user");
  return user ? user.value : null;
}

export async function updateUser(user: Partial<User>) {
  const cookie_user = cookies().get("user");
  cookies().set(
    "user",
    JSON.stringify({
      ...JSON.parse(cookie_user?.value ?? ""),
      ...user,
    })
  );
}

export async function requestAPI<T>(path: string, options: RequestInit = {}) {
  // await new Promise((resolved) => setTimeout(resolved, 1500));
  const token = cookies().get("token");

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(process.env.API_URL + path, {
    ...options,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    await logout();
    redirect("/login");
  }

  if (res.status >= 200) {
    return (await res.json()) as T;
  }

  return (await res.json()) as ErrorResponse;
}

export async function logout() {
  cookies().delete("token");
  cookies().delete("user");
}

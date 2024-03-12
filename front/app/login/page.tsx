import React from "react";
import LoginForm from "@/components/form/login-form";
import { Card, CardHeader } from "@/components/ui/card";
import { type Metadata } from "next";
import SectionTitle from "@/components/ui/custom/section-title";
import { isLoggedIn } from "@/utils/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login :: Expense Tracker",
};

async function LoginPage() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect("/");
  }
  return (
    <div>
      <SectionTitle className="text-center my-4">Login</SectionTitle>
      <Card className="max-w-md mx-auto my-8">
        <CardHeader>
          <LoginForm />
        </CardHeader>
      </Card>
    </div>
  );
}

export default LoginPage;

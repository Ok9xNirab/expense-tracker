import ChangeEmailForm from "@/components/form/change-email";
import ChangePasswordForm from "@/components/form/change-password";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionTitle from "@/components/ui/custom/section-title";
import User from "@/types/User";
import { getUser } from "@/utils/session";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Account :: Expense Tracker",
};

export default async function AccountPage() {
  const cookie = await getUser();
  let user = null;
  if (cookie) {
    user = JSON.parse(cookie) as User;
  }
  return (
    <div>
      <SectionTitle>Account</SectionTitle>
      <div className="flex items-start gap-6 my-6">
        <Card className="w-1/2">
          <CardHeader>
            <h5 className="font-medium text-xl">Change Email</h5>
          </CardHeader>
          <CardContent>
            <ChangeEmailForm email={user?.email ?? ""} />
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <h5 className="font-medium text-xl">Change Password</h5>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

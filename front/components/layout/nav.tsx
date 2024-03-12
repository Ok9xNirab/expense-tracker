"use client";
import SvgBars from "@/components/svg/bars";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { logout, requestAPI } from "@/utils/session";
import { toast } from "../ui/use-toast";
import { useDetectClickOutside } from "react-detect-click-outside";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createHash } from "crypto";
import User from "@/types/User";

export default function LayoutNav() {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const cookies = useCookies();
  const isLoggedIn = cookies.get("token");
  const user = cookies.get("user")
    ? (JSON.parse(cookies.get("user") ?? "") as User)
    : null;
  const router = useRouter();
  const ref = useDetectClickOutside({ onTriggered: () => setOpenMenu(false) });

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  function getNavItemClass(currentPath: string) {
    return pathname === currentPath ? "text-red-600" : "hover:text-red-600";
  }

  const image = useMemo(() => {
    return createHash("sha256")
      .update(user?.email ?? "user@test.com")
      .digest("hex");
  }, [user]);

  async function loggout() {
    setLoading(true);
    const res = await requestAPI<{ data: unknown }>("/logout");
    setLoading(false);

    if ("message" in res) {
      return toast({
        title: res.message || "Something went Wrong!",
        variant: "destructive",
      });
    }

    await logout();
    toast({
      title: "Logout successfull!",
    });
    router.push("/login");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="lg:hidden hover:text-red-600"
      >
        <SvgBars className="w-6 h-6" />
      </button>
      <ul
        className={`${
          openMenu ? "" : "hidden lg:flex"
        } absolute lg:static bg-white border lg:border-0 top-8 right-0 px-8 py-4 lg:px-0 lg:py-0 z-10 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 text-sm lg:text-lg font-medium`}
      >
        <li>
          <Link className={getNavItemClass("/")} href={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link
            className={getNavItemClass("/transactions")}
            href={"/transactions"}
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link className={getNavItemClass("/sources")} href={"/sources"}>
            Sources
          </Link>
        </li>
        {!isLoggedIn ? (
          <li>
            <Link className={getNavItemClass("/login")} href={"/login"}>
              Log in
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Button onClick={loggout} variant="outline">
                {loading && <ReloadIcon className="mr-2 animate-spin" />}
                Logout
              </Button>
            </li>
            <li>
              <Link href={"/account"}>
                <Image
                  className="w-10 h-10 border-2 rounded-full border-zinc-200"
                  src={`https://gravatar.com/avatar/${image}?s=200`}
                  alt="avatar"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

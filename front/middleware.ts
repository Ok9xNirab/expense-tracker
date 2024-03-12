import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./utils/session";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isLogged = await isLoggedIn();
  if (!isLogged) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sources"],
};

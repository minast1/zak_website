import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("__session")?.value;

  // Redirect the user to the home page if not logged in
  if (
    !session &&
    request.nextUrl.pathname.includes("/zachary-online/v1/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/zachary-online/v1/log-in", request.url)
    );
  }
  // if (session && !request.nextUrl.pathname.startsWith("/zachary-online")) {
  //   return NextResponse.redirect(new URL("/zachary-online/v1/dashboard", request.url));
  // }

  // if (
  //   !session &&
  //   !request.nextUrl.pathname.includes("/zachary-online/v1/log-in") &&
  //   !request.nextUrl.pathname.startsWith("/sign-up")
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  let token = req.cookies.get("usertoken")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log("verifiedToken Failed", err);
    }));

  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    !verifiedToken
  ) {
    return;
  }

  if (
    (req.url.includes("/login") || req.url.includes("/register")) &&
    verifiedToken
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/register"],
};

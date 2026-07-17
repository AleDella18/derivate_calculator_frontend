import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "BrUJTuTS28idUj5sfo2370BkUREjY3M2CJjp01UVrNm";

async function isTokenValid(token: string): Promise<boolean> {
  try {
    console.log("[JWT] Verifying token...");
    console.log("[JWT] Token:", token);

    const secret = new TextEncoder().encode(SECRET_KEY);

    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    console.log("[JWT] Token VALID");
    return true;
  } catch (error: any) {
    console.error("[JWT] Token INVALID");
    console.error(error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  console.log("========================================");
  console.log("[PROXY] New request");
  console.log("[PROXY] URL:", request.url);
  console.log("[PROXY] Path:", request.nextUrl.pathname);

  const token = request.cookies.get("auth_token")?.value;

  console.log("[PROXY] Cookie present:", !!token);

  if (token) {
    console.log("[PROXY] Token:", token);
  } else {
    console.log("[PROXY] auth_token NOT FOUND");
  }

  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);

  if (pathname === "/login") {
    console.log("[PROXY] Inside /login");

    if (!token) {
      console.log("[PROXY] No token -> allow login page");
      return NextResponse.next();
    }

    const valid = await isTokenValid(token);

    if (!valid) {
      console.log("[PROXY] Invalid token -> deleting cookie");

      const response = NextResponse.next();
      response.cookies.delete("auth_token");
      return response;
    }

    console.log("[PROXY] Valid token -> redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/") {
    console.log("[PROXY] Inside /");

    if (!token) {
      console.log("[PROXY] No token -> redirect to login");
      return NextResponse.redirect(loginUrl);
    }

    const valid = await isTokenValid(token);

    if (!valid) {
      console.log("[PROXY] Invalid token -> redirect to login");

      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("auth_token");
      return response;
    }

    console.log("[PROXY] Token valid -> allow access");
  }

  console.log("[PROXY] Next()");
  console.log("========================================");

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.SECRET_KEY || "BrUJTuTS28idUj5sfo2370BkUREjY3M2CJjp01UVrNm";

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(SECRET_KEY);

    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  
  const { pathname } = request.nextUrl;
  

  const loginUrl = new URL("/login", request.url);

  if (pathname === "/login") {
    
    if (!token) {
      return NextResponse.next();
    }

    const valid = await isTokenValid(token);
    

    if (!valid) {
      const response = NextResponse.next();
      response.cookies.delete("auth_token");
      return response;
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/") {
    
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }

    const valid = await isTokenValid(token);
    

    if (!valid) {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("auth_token");
      return response;
    }
  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/", "/login"],
};
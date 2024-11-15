import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET as string);
  const token = request.cookies.get("authorization")?.value;
  const path = request.nextUrl.pathname;

  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "'Access-Control-Allow-Headers'",
    "Content-Type, Authorization"
  );

  // PEGANDO USUÁRIO
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_API}/api/user/get_user`,
    {
      method: "POST",
      body: JSON.stringify({ token }),
    }
  );
  const { user } = await result.json();

  if (!user) {
    if (!(path == "/login" || path == "/register"))
      return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && (path === "/register" || path === "/login")) {
    return NextResponse.redirect(new URL("home", request.url));
  }
}

export const config = {
  matcher: [
    "/profile",
    "/home",
    "/student/:path*",
    "/add_students/:path*",
    "/add_student/:path*",
    "/login",
    "/register",
  ],
};

import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authorization")?.value;
  const path = request.nextUrl.pathname;

  // PEGANDO USUÁRIO
  const result = await fetch(`${process.env.HOST}/api/user/get_user`, {
    method: "POST",
    body: JSON.stringify({ token }),
  });
  const { user } = await result.json();

  if (!user) {
    if (!(path == "/login" || path == "/register" || path == "/"))
      return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && (path === "/register" || path === "/login" || path === "/")) {
    return NextResponse.redirect(new URL("/home", request.url));
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
    "/",
  ],
};

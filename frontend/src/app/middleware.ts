
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isAuth = !!token
  const isLoginPage = req.nextUrl.pathname === "/login"

  const publicRoutes = ["/", "/login"]

  if (!isAuth && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}


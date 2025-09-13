// app/api/logout/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  const res = NextResponse.redirect(new URL("/landing", "http://localhost:3000")) // use absolute URL

  // Delete the cookie
  res.cookies.set("userId", "", { path: "/", maxAge: 0 })

  return res
}

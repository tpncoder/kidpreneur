import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const cookieStore = cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) return NextResponse.json({ loggedIn: false })

  const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } })

  if (!user) return NextResponse.json({ loggedIn: false })

  return NextResponse.json({ loggedIn: true, email: user.email })
}

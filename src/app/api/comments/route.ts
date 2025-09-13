import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { text, postId } = await req.json()
  const cookieStore = cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 })
  }

  const comment = await prisma.comment.create({
    data: {
      text,
      postId: parseInt(postId),
      authorId: parseInt(userId),
    },
    include: { author: true },
  })

  return NextResponse.json(comment)
}

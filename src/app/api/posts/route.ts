import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { title, content } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: parseInt(userId),
      },
    })

    return NextResponse.json({ message: "Post created", post })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

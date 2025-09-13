import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id)

  try {
    await prisma.post.delete({
      where: { id: postId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const postId = parseInt(context.params.id)
  const body = await req.json()
  const { title, content } = body

  // Get userId from cookie for authorization
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.match(/userId=(\d+)/)
  const userId = match ? parseInt(match[1]) : null

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const updated = await prisma.post.updateMany({
      where: { id: postId, authorId: userId },
      data: { title, content },
    })

    if (updated.count === 0)
      return NextResponse.json({ error: "Cannot update this post" }, { status: 403 })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const postId = parseInt(context.params.id)

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
        comments: { include: { author: true } },
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to get post" }, { status: 500 })
  }
}

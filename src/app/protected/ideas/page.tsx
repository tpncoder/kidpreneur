import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function ExploreIdeasPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, comments: true },
  })

  return (
    <main className="max-w-2xl mx-auto py-8 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Explore Ideas</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No ideas yet. Be the first!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 hover:shadow transition"
          >
            <h2 className="text-xl font-semibold">
              <Link href={`/ideas/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-muted-foreground">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              By {post.author.email} • {post.comments.length} comments
            </p>
          </div>
        ))
      )}
    </main>
  )
}

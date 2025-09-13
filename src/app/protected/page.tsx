import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  // Fetch posts with comments
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true, // needed to count them
    },
  })

  // Sort by comment count (desc) & take top 10
  const sortedPosts = posts
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 5)

  return (
    <main className="max-w-2xl mx-auto py-8 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      {sortedPosts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        sortedPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 hover:shadow transition"
          >
            <h2 className="text-xl font-semibold">
              <Link href={`/protected/ideas/${post.id}`}>{post.title}</Link>
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

import { prisma } from "@/lib/prisma"
import { Comment } from "@/components/Comment"
import { IdeaCard } from "@/components/ideaCard"
import CommentForm from "@/components/CommentForm"

export default async function IdeaDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
    include: { author: true, comments: { include: { author: true } } },
  })

  if (!post) {
    return <p>Post not found</p>
  }

  const ideaForCard = {
    id: post.id,
    title: post.title,
    problem: "",
    solution: post.content,
    author: post.author.email,
    votes: 0,
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      <IdeaCard idea={ideaForCard} />
      <section>
        <h3 className="text-lg font-semibold mb-3">Comments</h3>

        <CommentForm postId={post.id} />

        <div className="space-y-3 mt-4">
          {post.comments.length === 0 ? (
            <p className="text-muted-foreground">No comments yet.</p>
          ) : (
            post.comments.map((c) => (
              <Comment
                key={c.id}
                comment={{
                  id: c.id,
                  user: c.author.email,
                  text: c.text,
                }}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}

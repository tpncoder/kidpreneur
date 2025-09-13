"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function EditPostForm({ id }: { id: string }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title)
        setContent(data.content)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load post")
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })
      if (!res.ok) throw new Error("Failed to update post")
      router.push(`/ideas/${id}`)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  if (loading) return <p className="text-center mt-8">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <form onSubmit={handleUpdate}>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-end mt-2">
            <Button type="submit">Update Post</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

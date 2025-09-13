"use client"

import { useState } from "react"

export default function CommentForm({ postId }: { postId: number }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, postId }),
    })

    if (res.ok) {
      setText("")
      location.reload() // refresh page to see new comment
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border rounded px-3 py-2"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"

export default function DeletePostButton({ postId }: { postId: number }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return
    setLoading(true)

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        router.push("/protected/")
      } else {
        alert("Failed to delete post")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      size="sm"
      className="bg-red-700"
    >
      {loading ? "Deleting..." : "Delete"}
    </Button>
  )
}

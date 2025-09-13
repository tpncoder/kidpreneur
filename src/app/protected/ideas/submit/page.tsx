"use client"

import { IdeaForm } from "@/components/ideaForm"

export default function SubmitIdeaPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Submit Your Idea</h2>
      <p className="text-muted-foreground mb-6">
        Share your startup idea along with the problem it solves.
      </p>
      <IdeaForm />
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"

export function Comment({ comment }: { comment: any }) {
  return (
    <Card>
      <CardContent className="p-3">
        <p className="text-sm">
          <span className="font-semibold">@{comment.user}</span>: {comment.text}
        </p>
      </CardContent>
    </Card>
  )
}

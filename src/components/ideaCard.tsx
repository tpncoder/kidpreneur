import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export function IdeaCard({ idea }: { idea: any }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          <Link href={`/ideas/${idea.id}`} className="hover:underline">
            {idea.title}
          </Link>
        </CardTitle>
        <p className="text-xs text-muted-foreground">by @{idea.author}</p>
      </CardHeader>
      <CardContent>
        <p><span className="font-medium">Problem:</span> {idea.problem}</p>
        <p className="mt-2"><span className="font-medium">Solution:</span> {idea.solution}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`/ideas/${idea.id}`} className="text-sm text-blue-600 hover:underline">
          View Comments →
        </Link>
      </CardFooter>
    </Card>
  )
}

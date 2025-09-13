import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home, PlusCircle, Lightbulb, LogIn, LogOut, User } from "lucide-react"
import { cookies } from "next/headers"

export function Navbar() {
  const cookieStore = cookies()
  const userId = cookieStore.get("userId")?.value
  const loggedIn = !!userId

  return (
    <aside className="w-20 md:w-64 border-r border-border bg-background p-4 hidden md:flex flex-col justify-between h-screen sticky top-0">
  {/* Top Section */}
  <div className="space-y-4">
    <h2 className="text-xl font-bold hidden md:block">KidPreneur</h2> {/* hide on small */}
    <nav className="flex flex-col space-y-2">
      <Link href="/protected/">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Home className="h-4 w-4" />
          <span className="hidden md:inline">Home</span>
        </Button>
      </Link>
      <Link href="/protected/ideas/submit">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <PlusCircle className="h-4 w-4" />
          <span className="hidden md:inline">Submit Idea</span>
        </Button>
      </Link>
      <Link href="/protected/ideas">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Lightbulb className="h-4 w-4" />
          <span className="hidden md:inline">Explore Ideas</span>
        </Button>
      </Link>
    </nav>
    <Separator />
  </div>

  {/* Bottom Section */}
  <div className="space-y-2">
    {loggedIn ? (
      <>
        <Link href={`/protected/user/${userId}`}>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </Button>
        </Link>
        <Link href="/api/logout">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </Link>
      </>
    ) : (
      <Link href="/login">
        <Button variant="ghost" className="w-full justify-start gap-2 bg-red-700">
          <LogIn className="h-4 w-4" />
          <span className="hidden md:inline">Login</span>
        </Button>
      </Link>
    )}
  </div>
</aside>

  )
}

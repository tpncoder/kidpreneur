import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-500 via-red-400 to-red-700">
      <div className="bg-white rounded-xl p-10 shadow-lg flex flex-col items-center justify-center space-y-6 max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-900">Welcome to KidPreneur</h1>
        <p className="text-gray-600 text-center">
          Discover, share, and collaborate on innovative startup ideas.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

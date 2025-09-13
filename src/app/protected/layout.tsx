import { Navbar } from "@/components/Navbar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const userCookie = cookieStore.get("userId")?.value

  if (!userCookie) {
    redirect("/landing")
  }

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500/20 via-red-400/20 to-red-700/20">
        <div className="inline-block rounded-xl p-1">
          <div className="bg-white rounded-xl p-10 flex flex-col items-center space-y-6 max-w-md w-full">
          {children}
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events?.on("routeChangeStart", handleStart)
    router.events?.on("routeChangeComplete", handleComplete)
    router.events?.on("routeChangeError", handleComplete)

    return () => {
      router.events?.off("routeChangeStart", handleStart)
      router.events?.off("routeChangeComplete", handleComplete)
      router.events?.off("routeChangeError", handleComplete)
    }
  }, [router])

  if (!loading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
    </div>
  )
}

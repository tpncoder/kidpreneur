import "./globals.css"
import { Inter } from "next/font/google"

import GlobalLoader from "@/components/GlobalLoader"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
        <body className="min-h-screen bg-gray-50">
            <GlobalLoader />
            {children}
        </body>
    </html>
  )
}

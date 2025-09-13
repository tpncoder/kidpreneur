export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        {children}
      </div>
    </div>
  )
}

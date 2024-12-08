import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">MPU Management Platform</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/auth/login" 
                className="group p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-foreground">Login →</h2>
            <p className="group-hover:text-foreground">Access your management dashboard</p>
          </Link>
          
          <div className="p-4 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">System Status</h2>
            <p>System is running normally</p>
          </div>
        </div>
      </div>
    </div>
  )
}

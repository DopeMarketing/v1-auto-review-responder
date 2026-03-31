import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auto Review Responder',
  description: 'Automated review response management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="font-bold text-xl">AutoReview</div>
                <nav className="flex space-x-4">
                  <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
                  <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md">Sign Up</a>
                </nav>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
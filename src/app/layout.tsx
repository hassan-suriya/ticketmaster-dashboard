import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventHub - Discover Live Events Worldwide',
  description: 'Your premier destination for discovering live events, concerts, sports, and entertainment experiences worldwide. Powered by real-time event data.',
  keywords: 'events, concerts, sports, tickets, entertainment, live shows, eventhub',
  authors: [{ name: 'EventHub' }],
  openGraph: {
    title: 'EventHub - Discover Live Events',
    description: 'Discover amazing live events worldwide',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">EH</span>
                        </div>
                        <div>
                          <h1 className="text-xl font-bold text-gray-900">
                            EventHub
                          </h1>
                          <p className="text-xs text-gray-500 -mt-1">
                            Discover Live Events
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>                <nav className="hidden md:flex items-center space-x-8">
                  <a 
                    href="#events" 
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Events
                  </a>
                  <a 
                    href="#venues" 
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Venues
                  </a>
                </nav>
                
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Live Data
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">EH</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        EventHub
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm max-w-md">
                    Your premier destination for discovering live events worldwide. 
                    Find concerts, sports events, theater shows, and entertainment experiences using real-time data.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Live event search</li>
                    <li>• Venue information</li>
                    <li>• Price comparisons</li>
                    <li>• CSV export</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a 
                        href="https://developer.ticketmaster.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        Data Provider
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        API Documentation
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-gray-500">
                  © 2024 EventHub. Powered by Ticketmaster Discovery API.
                </p>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    Next.js
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    TypeScript
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

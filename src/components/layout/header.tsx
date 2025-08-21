import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Music, Ticket } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Ticket className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Ticketmaster Dashboard
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Calendar className="inline h-4 w-4 mr-1" />
              Events
            </Link>
            <Link
              href="/venues"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <MapPin className="inline h-4 w-4 mr-1" />
              Venues
            </Link>
            <Link
              href="/attractions"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Music className="inline h-4 w-4 mr-1" />
              Attractions
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

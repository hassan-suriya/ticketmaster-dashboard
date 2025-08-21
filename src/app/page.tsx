'use client';

import { useState } from 'react';
import { Calendar, MapPin, Music, Trophy, Theater, Star, Users, Zap } from 'lucide-react';
import { EventSearch } from '@/components/events/event-search';
import { Event } from '@/types/ticketmaster';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  const features = [
    {
      icon: Zap,
      title: "Real-Time Data",
      description: "Live event information powered by trusted data sources"
    },
    {
      icon: Calendar,
      title: "Smart Search",
      description: "Find events by keyword, location, date, and category"
    },
    {
      icon: MapPin,
      title: "Global Coverage",
      description: "Discover events in cities worldwide with venue details"
    },
    {
      icon: Star,
      title: "Export Ready",
      description: "Download event data as CSV for analysis and reporting"
    }
  ];

  const stats = [
    { label: "Countries Covered", value: "40+" },
    { label: "Live Events", value: "100K+" },
    { label: "Venues", value: "50K+" },
    { label: "Daily Updates", value: "24/7" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl"></div>
        <div className="relative px-8 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">Live Event Data</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Amazing{' '}
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Live Events
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Search through thousands of concerts, sports events, theater shows, and entertainment 
              experiences worldwide. Your gateway to discovering amazing live events.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                <Music className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">Concerts</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                <Trophy className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Sports</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                <Theater className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Theater</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Family</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Discover Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides powerful tools to search, explore, and analyze live events from around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4">
                  <IconComponent className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Event Search Section */}
      <section id="events">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Event Discovery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through our comprehensive database of live events and find your next amazing experience.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
          <EventSearch onEventsChange={setEvents} />
        </div>
      </section>

      {/* Results Summary */}
      {events.length > 0 && (
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {events.length} Amazing Events Found
            </h3>
            <p className="text-gray-600">
              Discover concerts, sports, theater, and more in your area
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

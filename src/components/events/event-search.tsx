'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Calendar, MapPin, Clock, DollarSign, ExternalLink, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Event, SearchFilters } from '@/types/ticketmaster';
import { formatDate, formatTime, getImageUrl, formatPrice } from '@/lib/utils';

interface EventSearchProps {
  onEventsChange?: (events: Event[]) => void;
}

export function EventSearch({ onEventsChange }: EventSearchProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    city: '',
    countryCode: 'US',
    size: 20,
    page: 0,
    sort: 'date,asc',
  });

  const searchEvents = async (searchFilters: SearchFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(','));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`/api/events?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      
      if (data.success && data.data?._embedded?.events) {
        setEvents(data.data._embedded.events);
        setTotalEvents(data.data.page?.totalElements || 0);
        setCurrentPage(data.data.page?.number || 0);
        onEventsChange?.(data.data._embedded.events);
      } else {
        setEvents([]);
        setTotalEvents(0);
        setError(data.message || 'No events found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setEvents([]);
      setTotalEvents(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchEvents({ ...filters, page: 0 });
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    searchEvents(newFilters);
  };

  const exportToCSV = () => {
    if (events.length === 0) return;

    const csvHeaders = [
      'Event Name',
      'Date',
      'Time',
      'Venue',
      'City',
      'State',
      'Country',
      'Price Range',
      'Status',
      'URL'
    ];

    const csvData = events.map(event => [
      event.name || '',
      event.dates?.start?.localDate || '',
      event.dates?.start?.localTime || '',
      event._embedded?.venues?.[0]?.name || '',
      event._embedded?.venues?.[0]?.city?.name || '',
      event._embedded?.venues?.[0]?.state?.name || '',
      event._embedded?.venues?.[0]?.country?.name || '',
      event.priceRanges?.[0] ? `${formatPrice(event.priceRanges[0].min || 0)} - ${formatPrice(event.priceRanges[0].max || 0)}` : '',
      event.status?.code || '',
      event.url || ''
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `eventhub-events-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  useEffect(() => {
    // Load initial events
    searchEvents(filters);
  }, []);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="search-section">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Search className="h-6 w-6 text-primary-600" />
            </div>
            Discover Amazing Events
          </CardTitle>
          <p className="text-gray-600 mt-2">Search through thousands of live events worldwide</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="search-grid">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Search Events
              </label>
              <Input
                placeholder="Concert, sports, theater..."
                value={filters.keyword || ''}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                City
              </label>
              <Input
                placeholder="New York, London, Tokyo..."
                value={filters.city || ''}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Country
              </label>
              <Select
                value={filters.countryCode || 'US'}
                onChange={(e) => setFilters({ ...filters, countryCode: e.target.value })}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary-500"
              >
                <option value="US">🇺🇸 United States</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="FR">🇫🇷 France</option>
                <option value="ES">🇪🇸 Spain</option>
                <option value="IT">🇮🇹 Italy</option>
                <option value="NL">🇳🇱 Netherlands</option>
                <option value="MX">🇲🇽 Mexico</option>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Sort By
              </label>
              <Select
                value={filters.sort || 'date,asc'}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary-500"
              >
                <option value="date,asc">📅 Date (Nearest First)</option>
                <option value="date,desc">📅 Date (Farthest First)</option>
                <option value="name,asc">🔤 Name (A-Z)</option>
                <option value="name,desc">🔤 Name (Z-A)</option>
                <option value="relevance,desc">⭐ Most Relevant</option>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            <Button onClick={handleSearch} disabled={loading} size="lg" className="flex-1 sm:flex-none">
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Events
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={exportToCSV}
              disabled={events.length === 0}
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
              <Sparkles className="h-4 w-4 mr-2 text-primary-500" />
              {totalEvents > 0 ? `${totalEvents.toLocaleString()} events found` : 'Ready to search'}
            </div>
          </div>
        </CardContent>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-gray-600 text-lg">Finding amazing events for you...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={() => searchEvents(filters)}>
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to discover events</h3>
            <p className="text-gray-600 mb-4">Use the search filters above to find concerts, sports, theater, and more!</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-3 bg-white rounded-xl shadow-soft border border-gray-200 p-2">
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4"
                >
                  Previous
                </Button>
                
                <div className="flex items-center px-4 py-2 bg-primary-50 rounded-lg">
                  <span className="text-sm font-medium text-primary-700">
                    Page {currentPage + 1}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={events.length < (filters.size || 20)}
                  className="px-4"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const venue = event._embedded?.venues?.[0];
  const imageUrl = getImageUrl(event.images, '16_9');
  const startDate = event.dates?.start?.localDate;
  const startTime = event.dates?.start?.localTime;
  const priceRange = event.priceRanges?.[0];

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'onsale':
        return <span className="status-onsale">On Sale</span>;
      case 'offsale':
        return <span className="status-offsale">Off Sale</span>;
      case 'presale':
        return <span className="status-presale">Pre-Sale</span>;
      default:
        return null;
    }
  };

  return (
    <div className="event-card">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={event.name}
          className="event-card-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        {event.status?.code && (
          <div className="absolute top-4 right-4">
            {getStatusBadge(event.status.code)}
          </div>
        )}
        
        {/* Quick Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          {startDate && (
            <div className="flex items-center text-white text-sm font-medium mb-1">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(startDate)}
            </div>
          )}
        </div>
      </div>
      
      <div className="event-card-content space-y-4">
        <div>
          <h3 className="event-card-title">
            {event.name}
          </h3>
          
          <div className="space-y-2">
            {startTime && (
              <div className="event-card-info">
                <Clock className="h-4 w-4 mr-2 text-primary-500" />
                {formatTime(startTime)}
              </div>
            )}
            
            {venue && (
              <div className="event-card-info">
                <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                <span className="truncate">
                  {venue.name}
                  {venue.city?.name && `, ${venue.city.name}`}
                  {venue.state?.stateCode && `, ${venue.state.stateCode}`}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {priceRange && (
            <div className="event-card-price flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {priceRange.min && priceRange.max
                ? `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`
                : priceRange.min
                ? `From ${formatPrice(priceRange.min)}`
                : priceRange.max
                ? `Up to ${formatPrice(priceRange.max)}`
                : 'Price TBA'}
            </div>
          )}
          
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
            >
              View Tickets
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

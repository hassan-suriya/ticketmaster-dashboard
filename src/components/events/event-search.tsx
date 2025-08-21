'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Calendar, MapPin } from 'lucide-react';
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
    link.download = `ticketmaster-events-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  useEffect(() => {
    // Load initial events
    searchEvents(filters);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keyword
              </label>
              <Input
                placeholder="Search events..."
                value={filters.keyword || ''}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Input
                placeholder="Enter city"
                value={filters.city || ''}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Select
                value={filters.countryCode || 'US'}
                onChange={(e) => setFilters({ ...filters, countryCode: e.target.value })}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
                <option value="NL">Netherlands</option>
                <option value="MX">Mexico</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <Select
                value={filters.sort || 'date,asc'}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              >
                <option value="date,asc">Date (Ascending)</option>
                <option value="date,desc">Date (Descending)</option>
                <option value="name,asc">Name (A-Z)</option>
                <option value="name,desc">Name (Z-A)</option>
                <option value="relevance,desc">Relevance</option>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            
            <Button
              variant="outline"
              onClick={exportToCSV}
              disabled={events.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Events {totalEvents > 0 && `(${totalEvents.toLocaleString()} results)`}
          </h2>
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No events found. Try adjusting your search criteria.</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                
                <span className="flex items-center px-4 text-sm text-gray-700">
                  Page {currentPage + 1}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={events.length < (filters.size || 20)}
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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={event.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg';
          }}
        />
        {event.status?.code && (
          <div className="absolute top-2 right-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
              {event.status.code}
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {event.name}
        </h3>
        
        {startDate && (
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(startDate)}
            {startTime && ` at ${formatTime(startTime)}`}
          </div>
        )}
        
        {venue && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {venue.name}
            {venue.city?.name && `, ${venue.city.name}`}
            {venue.state?.stateCode && `, ${venue.state.stateCode}`}
          </div>
        )}
        
        {priceRange && (
          <div className="text-sm text-gray-900 font-medium">
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
          <div className="mt-3">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View on Ticketmaster →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

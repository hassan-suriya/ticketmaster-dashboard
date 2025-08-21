'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Download } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Venue, SearchFilters } from '@/types/ticketmaster';
import { getImageUrl } from '@/lib/utils';

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalVenues, setTotalVenues] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    keyword: '',
    city: '',
    countryCode: 'US',
    size: 20,
    page: 0,
    sort: 'name,asc',
  });

  const searchVenues = async (searchFilters: Partial<SearchFilters>) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/venues?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch venues');
      }
      
      const data = await response.json();
      
      if (data.success && data.data?._embedded?.venues) {
        setVenues(data.data._embedded.venues);
        setTotalVenues(data.data.page?.totalElements || 0);
        setCurrentPage(data.data.page?.number || 0);
      } else {
        setVenues([]);
        setTotalVenues(0);
        setError(data.message || 'No venues found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setVenues([]);
      setTotalVenues(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchVenues({ ...filters, page: 0 });
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    searchVenues(newFilters);
  };

  const exportToCSV = () => {
    if (venues.length === 0) return;

    const csvHeaders = [
      'Venue Name',
      'Type',
      'City',
      'State',
      'Country',
      'Postal Code',
      'Address',
      'URL'
    ];

    const csvData = venues.map(venue => [
      venue.name || '',
      venue.type || '',
      venue.city?.name || '',
      venue.state?.name || '',
      venue.country?.name || '',
      venue.postalCode || '',
      venue.address?.line1 || '',
      venue.url || ''
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ticketmaster-venues-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  useEffect(() => {
    searchVenues(filters);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Explore Venues
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Discover concert halls, stadiums, theaters, and more venues worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Venues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue Name
                    </label>
                    <Input
                      placeholder="Search venues..."
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
                      value={filters.sort || 'name,asc'}
                      onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    >
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
                    disabled={venues.length === 0}
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
                  Venues {totalVenues > 0 && `(${totalVenues.toLocaleString()} results)`}
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

              {!loading && !error && venues.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No venues found. Try adjusting your search criteria.</p>
                </div>
              )}

              {!loading && venues.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                      <VenueCard key={venue.id} venue={venue} />
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
                        disabled={venues.length < (filters.size || 20)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  const imageUrl = getImageUrl(venue.images || [], '16_9');

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg';
          }}
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {venue.name}
        </h3>
        
        {venue.type && (
          <div className="text-sm text-blue-600 font-medium mb-2">
            {venue.type}
          </div>
        )}
        
        <div className="space-y-1 text-sm text-gray-600">
          {venue.address?.line1 && (
            <div>{venue.address.line1}</div>
          )}
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {venue.city?.name}
            {venue.state?.name && `, ${venue.state.name}`}
            {venue.country?.name && `, ${venue.country.name}`}
          </div>
          
          {venue.postalCode && (
            <div className="text-gray-500">
              {venue.postalCode}
            </div>
          )}
        </div>
        
        {venue.url && (
          <div className="mt-3">
            <a
              href={venue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Details →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

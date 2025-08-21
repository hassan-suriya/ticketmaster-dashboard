import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  TicketmasterApiResponse, 
  EventsResponse, 
  Event, 
  VenuesResponse, 
  Venue, 
  AttractionsResponse, 
  Attraction,
  SearchFilters,
  ApiError
} from '@/types/ticketmaster';

class TicketmasterService {
  private api: AxiosInstance;
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.TICKETMASTER_API_KEY || '';
    this.baseURL = process.env.TICKETMASTER_API_URL || 'https://app.ticketmaster.com/discovery/v2';
    
    if (!this.apiKey) {
      throw new Error('TICKETMASTER_API_KEY is required');
    }

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      params: {
        apikey: this.apiKey,
      },
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data?.fault) {
          const apiError: ApiError = error.response.data;
          throw new Error(`Ticketmaster API Error: ${apiError.fault.faultstring}`);
        }
        throw error;
      }
    );
  }

  /**
   * Search for events with optional filters
   */
  async searchEvents(filters: SearchFilters = {}): Promise<TicketmasterApiResponse<EventsResponse>> {
    try {
      const params = this.buildSearchParams(filters);
      const response: AxiosResponse<TicketmasterApiResponse<EventsResponse>> = await this.api.get('/events.json', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  }

  /**
   * Get event details by ID
   */
  async getEventById(id: string): Promise<Event> {
    try {
      const response: AxiosResponse<Event> = await this.api.get(`/events/${id}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get event images by ID
   */
  async getEventImages(id: string): Promise<{ images: any[] }> {
    try {
      const response: AxiosResponse<{ images: any[] }> = await this.api.get(`/events/${id}/images.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event images ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search for venues with optional filters
   */
  async searchVenues(filters: Partial<SearchFilters> = {}): Promise<TicketmasterApiResponse<VenuesResponse>> {
    try {
      const params = this.buildSearchParams(filters);
      const response: AxiosResponse<TicketmasterApiResponse<VenuesResponse>> = await this.api.get('/venues.json', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error searching venues:', error);
      throw error;
    }
  }

  /**
   * Get venue details by ID
   */
  async getVenueById(id: string): Promise<Venue> {
    try {
      const response: AxiosResponse<Venue> = await this.api.get(`/venues/${id}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching venue ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search for attractions with optional filters
   */
  async searchAttractions(filters: Partial<SearchFilters> = {}): Promise<TicketmasterApiResponse<AttractionsResponse>> {
    try {
      const params = this.buildSearchParams(filters);
      const response: AxiosResponse<TicketmasterApiResponse<AttractionsResponse>> = await this.api.get('/attractions.json', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error searching attractions:', error);
      throw error;
    }
  }

  /**
   * Get attraction details by ID
   */
  async getAttractionById(id: string): Promise<Attraction> {
    try {
      const response: AxiosResponse<Attraction> = await this.api.get(`/attractions/${id}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching attraction ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(keyword: string): Promise<any> {
    try {
      const response = await this.api.get('/suggest', {
        params: {
          keyword,
          size: 10,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      throw error;
    }
  }

  /**
   * Build search parameters from filters
   */
  private buildSearchParams(filters: Partial<SearchFilters>): Record<string, any> {
    const params: Record<string, any> = {};

    // Basic search parameters
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.city) params.city = filters.city;
    if (filters.stateCode) params.stateCode = filters.stateCode;
    if (filters.countryCode) params.countryCode = filters.countryCode;
    if (filters.venueId) params.venueId = filters.venueId;
    if (filters.attractionId) params.attractionId = filters.attractionId;

    // Classification filters
    if (filters.classificationName?.length) {
      params.classificationName = filters.classificationName.join(',');
    }
    if (filters.classificationId?.length) {
      params.classificationId = filters.classificationId.join(',');
    }
    if (filters.segmentId?.length) {
      params.segmentId = filters.segmentId.join(',');
    }
    if (filters.genreId?.length) {
      params.genreId = filters.genreId.join(',');
    }

    // Date filters
    if (filters.startDateTime) params.startDateTime = filters.startDateTime;
    if (filters.endDateTime) params.endDateTime = filters.endDateTime;

    // Pagination and sorting
    if (filters.size) params.size = filters.size;
    if (filters.page) params.page = filters.page;
    if (filters.sort) params.sort = filters.sort;

    // Location filters
    if (filters.radius) params.radius = filters.radius;
    if (filters.unit) params.unit = filters.unit;

    // Other filters
    if (filters.source) params.source = filters.source;
    if (filters.includeSpellcheck) params.includeSpellcheck = filters.includeSpellcheck;

    return params;
  }

  /**
   * Get events by location (city or coordinates)
   */
  async getEventsByLocation(location: string, radius: string = '50', unit: 'miles' | 'km' = 'miles'): Promise<TicketmasterApiResponse<EventsResponse>> {
    return this.searchEvents({
      city: location,
      radius,
      unit,
      sort: 'date,asc',
    });
  }

  /**
   * Get events by date range
   */
  async getEventsByDateRange(startDate: string, endDate: string): Promise<TicketmasterApiResponse<EventsResponse>> {
    return this.searchEvents({
      startDateTime: startDate,
      endDateTime: endDate,
      sort: 'date,asc',
    });
  }

  /**
   * Get popular events (using relevance sorting)
   */
  async getPopularEvents(size: number = 20): Promise<TicketmasterApiResponse<EventsResponse>> {
    return this.searchEvents({
      size,
      sort: 'relevance,desc',
    });
  }

  /**
   * Get events by category/genre
   */
  async getEventsByCategory(classificationName: string): Promise<TicketmasterApiResponse<EventsResponse>> {
    return this.searchEvents({
      classificationName: [classificationName],
      sort: 'relevance,desc',
    });
  }
}

// Create a singleton instance
const ticketmasterService = new TicketmasterService();

export default ticketmasterService;

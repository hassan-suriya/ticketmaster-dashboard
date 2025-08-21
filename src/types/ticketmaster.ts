// Ticketmaster API Response Types

export interface TicketmasterApiResponse<T> {
  _embedded?: T;
  _links: Links;
  page: PageInfo;
}

export interface Links {
  self: Link;
  next?: Link;
  prev?: Link;
  first?: Link;
  last?: Link;
}

export interface Link {
  href: string;
  templated?: boolean;
}

export interface PageInfo {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

// Event Types
export interface EventsResponse {
  events: Event[];
}

export interface Event {
  id: string;
  name: string;
  type?: string;
  url?: string;
  locale?: string;
  images: Image[];
  sales?: Sales;
  dates: Dates;
  classifications: Classification[];
  priceRanges?: PriceRange[];
  status?: Status;
  ticketLimit?: TicketLimit;
  pleaseNote?: string;
  info?: string;
  _embedded?: {
    venues?: Venue[];
    attractions?: Attraction[];
  };
  _links: Links;
}

export interface Image {
  ratio?: string;
  url: string;
  width: number;
  height: number;
  fallback?: boolean;
}

export interface Sales {
  public?: SalePhase;
  presales?: SalePhase[];
}

export interface SalePhase {
  startDateTime?: string;
  startTBD?: boolean;
  startTBA?: boolean;
  endDateTime?: string;
}

export interface Dates {
  start?: DateInfo;
  end?: DateInfo;
  timezone?: string;
  status?: Status;
  spanMultipleDays?: boolean;
}

export interface DateInfo {
  localDate?: string;
  localTime?: string;
  dateTime?: string;
  dateTBD?: boolean;
  dateTBA?: boolean;
  timeTBA?: boolean;
  noSpecificTime?: boolean;
}

export interface Status {
  code: string;
}

export interface Classification {
  primary?: boolean;
  segment?: ClassificationUnit;
  genre?: ClassificationUnit;
  subGenre?: ClassificationUnit;
  type?: ClassificationUnit;
  subType?: ClassificationUnit;
  family?: boolean;
}

export interface ClassificationUnit {
  id: string;
  name: string;
}

export interface PriceRange {
  type: string;
  currency: string;
  min?: number;
  max?: number;
}

export interface TicketLimit {
  info?: string;
}

// Venue Types
export interface VenuesResponse {
  venues: Venue[];
}

export interface Venue {
  id: string;
  name: string;
  type?: string;
  url?: string;
  locale?: string;
  images?: Image[];
  postalCode?: string;
  timezone?: string;
  city?: City;
  state?: State;
  country?: Country;
  address?: Address;
  location?: Location;
  markets?: Market[];
  dmas?: DMA[];
  social?: Social;
  boxOfficeInfo?: BoxOfficeInfo;
  parkingDetail?: string;
  accessibleSeatingDetail?: string;
  generalInfo?: GeneralInfo;
  _links: Links;
}

export interface City {
  name: string;
}

export interface State {
  name: string;
  stateCode: string;
}

export interface Country {
  name: string;
  countryCode: string;
}

export interface Address {
  line1?: string;
  line2?: string;
}

export interface Location {
  longitude?: string;
  latitude?: string;
}

export interface Market {
  name: string;
  id: string;
}

export interface DMA {
  id: number;
}

export interface Social {
  twitter?: SocialLink;
  facebook?: SocialLink;
  instagram?: SocialLink;
}

export interface SocialLink {
  handle?: string;
  url?: string;
}

export interface BoxOfficeInfo {
  phoneNumberDetail?: string;
  openHoursDetail?: string;
  acceptedPaymentDetail?: string;
  willCallDetail?: string;
}

export interface GeneralInfo {
  generalRule?: string;
  childRule?: string;
}

// Attraction Types
export interface AttractionsResponse {
  attractions: Attraction[];
}

export interface Attraction {
  id: string;
  name: string;
  type?: string;
  url?: string;
  locale?: string;
  images?: Image[];
  classifications?: Classification[];
  upcomingEvents?: UpcomingEvents;
  _links: Links;
}

export interface UpcomingEvents {
  _total: number;
  _filtered: number;
}

// Search and Filter Types
export interface SearchFilters {
  keyword?: string;
  city?: string;
  stateCode?: string;
  countryCode?: string;
  classificationName?: string[];
  classificationId?: string[];
  segmentId?: string[];
  genreId?: string[];
  venueId?: string;
  attractionId?: string;
  startDateTime?: string;
  endDateTime?: string;
  size?: number;
  page?: number;
  sort?: string;
  radius?: string;
  unit?: 'miles' | 'km';
  source?: 'ticketmaster' | 'universe' | 'frontgate' | 'tmr';
  includeSpellcheck?: 'yes' | 'no';
}

// API Error Types
export interface ApiError {
  fault: {
    faultstring: string;
    detail: {
      errorcode: string;
    };
  };
}

// Local Database Types (extending API types)
export interface DbEvent extends Omit<Event, 'id'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  source?: string;
  apiVersion?: string;
}

export interface DbVenue extends Omit<Venue, 'id'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  source?: string;
  apiVersion?: string;
}

export interface DbAttraction extends Omit<Attraction, 'id'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  source?: string;
  apiVersion?: string;
}

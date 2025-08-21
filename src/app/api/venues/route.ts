import { NextRequest, NextResponse } from 'next/server';
import ticketmasterService from '@/lib/ticketmaster';
import { SearchFilters } from '@/types/ticketmaster';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build filters from query parameters
    const filters: Partial<SearchFilters> = {};
    
    if (searchParams.get('keyword')) filters.keyword = searchParams.get('keyword')!;
    if (searchParams.get('city')) filters.city = searchParams.get('city')!;
    if (searchParams.get('stateCode')) filters.stateCode = searchParams.get('stateCode')!;
    if (searchParams.get('countryCode')) filters.countryCode = searchParams.get('countryCode')!;
    if (searchParams.get('sort')) filters.sort = searchParams.get('sort')!;
    if (searchParams.get('radius')) filters.radius = searchParams.get('radius')!;
    if (searchParams.get('unit')) filters.unit = searchParams.get('unit') as 'miles' | 'km';
    
    // Handle pagination
    if (searchParams.get('size')) filters.size = parseInt(searchParams.get('size')!);
    if (searchParams.get('page')) filters.page = parseInt(searchParams.get('page')!);
    
    console.log('Searching venues with filters:', filters);
    
    const response = await ticketmasterService.searchVenues(filters);
    
    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error in venues API:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch venues',
      },
      { status: 500 }
    );
  }
}

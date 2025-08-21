import { NextRequest, NextResponse } from 'next/server';
import ticketmasterService from '@/lib/ticketmaster';
import { SearchFilters } from '@/types/ticketmaster';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build filters from query parameters
    const filters: SearchFilters = {};
    
    if (searchParams.get('keyword')) filters.keyword = searchParams.get('keyword')!;
    if (searchParams.get('city')) filters.city = searchParams.get('city')!;
    if (searchParams.get('stateCode')) filters.stateCode = searchParams.get('stateCode')!;
    if (searchParams.get('countryCode')) filters.countryCode = searchParams.get('countryCode')!;
    if (searchParams.get('venueId')) filters.venueId = searchParams.get('venueId')!;
    if (searchParams.get('attractionId')) filters.attractionId = searchParams.get('attractionId')!;
    if (searchParams.get('startDateTime')) filters.startDateTime = searchParams.get('startDateTime')!;
    if (searchParams.get('endDateTime')) filters.endDateTime = searchParams.get('endDateTime')!;
    if (searchParams.get('sort')) filters.sort = searchParams.get('sort')!;
    if (searchParams.get('radius')) filters.radius = searchParams.get('radius')!;
    if (searchParams.get('unit')) filters.unit = searchParams.get('unit') as 'miles' | 'km';
    if (searchParams.get('source')) filters.source = searchParams.get('source') as any;
    
    // Handle array parameters
    if (searchParams.get('classificationName')) {
      filters.classificationName = searchParams.get('classificationName')!.split(',');
    }
    if (searchParams.get('classificationId')) {
      filters.classificationId = searchParams.get('classificationId')!.split(',');
    }
    if (searchParams.get('segmentId')) {
      filters.segmentId = searchParams.get('segmentId')!.split(',');
    }
    if (searchParams.get('genreId')) {
      filters.genreId = searchParams.get('genreId')!.split(',');
    }
    
    // Handle pagination
    if (searchParams.get('size')) filters.size = parseInt(searchParams.get('size')!);
    if (searchParams.get('page')) filters.page = parseInt(searchParams.get('page')!);
    
    console.log('Searching events with filters:', filters);
    
    const response = await ticketmasterService.searchEvents(filters);
    
    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error in events API:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch events',
      },
      { status: 500 }
    );
  }
}

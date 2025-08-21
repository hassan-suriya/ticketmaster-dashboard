import { NextRequest, NextResponse } from 'next/server';
import ticketmasterService from '@/lib/ticketmaster';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const eventId = params.id;
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    const event = await ticketmasterService.getEventById(eventId);
    
    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(`Error fetching event:`, error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch event',
      },
      { status: 500 }
    );
  }
}

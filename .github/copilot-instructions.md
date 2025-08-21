# Mini PRD – Ticketmaster Discovery API Integration Dashboard

## Overview
A lightweight dashboard that connects to the Ticketmaster Discovery API V2.0 to fetch and display live events, venues, and seat maps. The aim is to demonstrate working integration with Ticketmaster data in a simple, clear UI.

## Goals
- Show real-time event listings from Ticketmaster API.  
- Provide event details including venue, date, price range, and seat map.  
- Keep the design modular for future extension.  

## Core Features (MVP)

### 1. API Integration
- Connect to Ticketmaster Discovery API with API key.  
- Fetch events by keyword, location, or country.  
- Pull event details (name, date, venue, price ranges, seat map).  

### 2. Dashboard UI
- Simple event list with search and filters (date, city, category).  
- Event detail page showing:  
  - Event image and description  
  - Venue info (address, city, country)  
  - Price ranges  
  - Seat map (if available)  

### 3. Reporting
- Export event list to CSV/Excel for internal review.  

## Tech Stack
- NEXT JS
- Database: PostgreSQL (store synced event data for quick access).  

## Deliverables (Minimal Demo)
- Working dashboard with:  
  - Event search and listing (using Ticketmaster API).  
  - Event detail page (venue, price, seat map).  
  - CSV export of events.  
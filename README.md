# Ticketmaster Dashboard

A modern dashboard built with Next.js that integrates with the Ticketmaster Discovery API v2.0 to provide real-time access to events, venues, and attractions data.

## Features

- 🎟️ **Event Discovery**: Search and browse events with advanced filtering
- 🏟️ **Venue Explorer**: Find and explore venues worldwide
- 🎵 **Attraction Search**: Discover artists, sports teams, and attractions
- 📊 **Data Export**: Export search results to CSV
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Real-time API Integration**: Live data from Ticketmaster

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **API**: Ticketmaster Discovery API v2.0
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (optional, for data caching)
- Ticketmaster API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticketmaster-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```
   TICKETMASTER_API_KEY=your_api_key_here
   DATABASE_URL=your_database_url_here
   NEXTAUTH_SECRET=your_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database (optional)**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Events
- `GET /api/events` - Search events with filters
- `GET /api/events/[id]` - Get event details

### Venues
- `GET /api/venues` - Search venues with filters
- `GET /api/venues/[id]` - Get venue details

### Attractions
- `GET /api/attractions` - Search attractions with filters
- `GET /api/attractions/[id]` - Get attraction details

## Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Set environment variables in Vercel**
   ```
   TICKETMASTER_API_KEY=your_api_key
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   Vercel will automatically deploy your application.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TICKETMASTER_API_KEY` | Your Ticketmaster API key | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Optional |
| `NEXTAUTH_SECRET` | Secret for authentication | Yes |
| `NEXTAUTH_URL` | Your application URL | Yes |

## Features Overview

### Event Search
- Search events by keyword, location, date
- Filter by category, genre, venue
- Sort by date, relevance, name
- Export results to CSV
- Pagination support

### Venue Discovery
- Search venues by name and location
- View venue details and images
- Filter by country and city
- Export venue data

### Data Export
- CSV export functionality for events and venues
- Includes comprehensive event/venue information
- Formatted for easy analysis

## API Integration

The application integrates with the Ticketmaster Discovery API v2.0:

- **Events API**: Access to 230K+ events globally
- **Venues API**: Comprehensive venue information
- **Attractions API**: Artists, teams, and attractions data
- **Rate Limits**: 5000 calls/day, 5 requests/second
- **Global Coverage**: US, Canada, Europe, Australia, and more

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── venues/         # Venues page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── events/        # Event-related components
│   └── layout/        # Layout components
├── lib/               # Utility libraries
│   ├── ticketmaster.ts # API client
│   ├── prisma.ts      # Database client
│   └── utils.ts       # Helper functions
└── types/             # TypeScript types
    └── ticketmaster.ts # API type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
1. Check the [Issues](../../issues) page
2. Review the Ticketmaster API documentation
3. Create a new issue with detailed information

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Data provided by [Ticketmaster](https://ticketmaster.com/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

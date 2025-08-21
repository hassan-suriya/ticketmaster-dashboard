# Deployment Guide for Ticketmaster Dashboard

## Prerequisites for Deployment

1. **Ticketmaster API Key**
   - Get an API key from [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)
   - API key format: `3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6` (example)

2. **Database (Optional)**
   - PostgreSQL database for data caching
   - For production, consider using [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Supabase](https://supabase.com/)

## Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
# Create a new repository on GitHub
# Then push your code:
git remote add origin https://github.com/yourusername/ticketmaster-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the following environment variables:

#### Required Environment Variables
```
TICKETMASTER_API_KEY=your_actual_api_key_here
NEXTAUTH_SECRET=your_long_random_secret_string_here
NEXTAUTH_URL=https://your-project-name.vercel.app
```

#### Optional Environment Variables (if using database)
```
DATABASE_URL=your_postgresql_connection_string
```

### Step 3: Deploy
- Click "Deploy"
- Vercel will automatically build and deploy your application
- The build should complete successfully (we tested it locally)

## Alternative: Deploy to Netlify

1. Build the static version:
```bash
npm run build
npm run export  # If you want static export
```

2. Deploy the `out` folder to Netlify

## Environment Variables Explained

### TICKETMASTER_API_KEY
- **Required**: Yes
- **Description**: Your Ticketmaster Discovery API key
- **Format**: Alphanumeric string (32 characters)
- **Example**: `3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6`

### NEXTAUTH_SECRET
- **Required**: Yes
- **Description**: Secret key for securing sessions
- **Format**: Random string (minimum 32 characters)
- **Generate**: `openssl rand -base64 32` or use any password generator

### NEXTAUTH_URL
- **Required**: Yes (in production)
- **Description**: Your application's URL
- **Format**: Full URL with protocol
- **Example**: `https://ticketmaster-dashboard.vercel.app`

### DATABASE_URL (Optional)
- **Required**: No (app works without database)
- **Description**: PostgreSQL connection string for data caching
- **Format**: `postgresql://user:password@host:port/database`
- **Example**: `postgresql://postgres:password@localhost:5432/ticketmaster_db`

## Post-Deployment Testing

After deployment, test these features:

1. **Homepage**: Event search and filtering
2. **API Endpoints**: 
   - `/api/events` - Event search
   - `/api/venues` - Venue search
3. **Venues Page**: Venue listing and search
4. **CSV Export**: Download functionality

## Monitoring and Analytics

Consider adding:
- [Vercel Analytics](https://vercel.com/analytics)
- [Sentry](https://sentry.io/) for error tracking
- Custom logging for API usage

## Rate Limits

**Ticketmaster API Limits:**
- 5,000 requests per day
- 5 requests per second

**Recommendations:**
- Implement caching with database
- Add request debouncing on frontend
- Monitor usage in production

## Troubleshooting

### Build Errors
- Check environment variables are set correctly
- Ensure API key format is correct
- Verify all dependencies are installed

### Runtime Errors
- Check API key is valid and active
- Verify network connectivity to Ticketmaster API
- Check browser console for client-side errors

### Performance Issues
- Enable database caching
- Implement request throttling
- Use CDN for static assets

## Next Steps After Deployment

1. **Custom Domain**: Set up custom domain in Vercel
2. **SSL Certificate**: Automatically provided by Vercel
3. **Database Setup**: Implement PostgreSQL for data caching
4. **Analytics**: Add usage tracking
5. **SEO**: Optimize meta tags and add sitemap
6. **Testing**: Set up automated testing

## Support

For issues:
1. Check the [GitHub Issues](../../issues)
2. Review [Ticketmaster API Documentation](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)
3. Check [Vercel Documentation](https://vercel.com/docs)

---

Your Ticketmaster Dashboard is now ready for production deployment! 🚀

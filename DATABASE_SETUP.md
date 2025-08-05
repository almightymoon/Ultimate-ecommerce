# Database Setup Guide

## Overview
This e-commerce application uses MongoDB as its database. The application includes fallback data for when the database is not available, ensuring it works out of the box.

## Quick Start

### 1. Install MongoDB
```bash
# On macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB service
brew services start mongodb-community@7.0
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=ultimate-ecommerce
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Populate Database
Run the database population script to add sample data:
```bash
node scripts/populate-db.js
```

## Database Collections

### Products
- Sample products with categories, prices, ratings, and stock information
- Includes featured products for the homepage

### Categories
- Product categories with descriptions and subcategories
- Used for filtering and navigation

### Deals
- Active promotional deals and discounts
- Includes start and end dates for time-based offers

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/[id]` - Get a specific product

### Categories
- `GET /api/categories` - Get all categories

### Deals
- `GET /api/deals` - Get active deals (not expired)

## Fallback Data
If the database is not available, the application automatically uses fallback data:
- 6 sample products across different categories
- 6 product categories
- 3 active deals

## Troubleshooting

### Database Connection Issues
1. Ensure MongoDB is running: `brew services list | grep mongodb`
2. Check connection string in `.env.local`
3. Verify database name is correct

### Empty API Responses
1. Run the population script: `node scripts/populate-db.js`
2. Check if deals have valid end dates (should be in the future)
3. Verify collection names match the API routes

### MongoDB Atlas (Cloud Database)
To use MongoDB Atlas instead of local MongoDB:
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ultimate-ecommerce?retryWrites=true&w=majority
   ```

## Development
- The application gracefully handles database connection failures
- All API routes include fallback data
- Database operations are cached for better performance
- Error messages provide helpful debugging information 
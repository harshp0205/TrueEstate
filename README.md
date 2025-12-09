# TruEstate Retail Sales Management System

## Overview

TruEstate is a comprehensive retail sales management system that enables real-time monitoring and analysis of sales transactions. The application provides advanced filtering, sorting, and search capabilities to efficiently manage large datasets. Built with a modern tech stack, it features server-side data processing with MongoDB aggregation for optimal performance, a responsive React frontend with intuitive UI components, and comprehensive edge case handling for production-ready reliability.

## Tech Stack

**Frontend:**
- React 18.2 with Vite 4.4
- React Router 6.16 for navigation
- Axios 1.5 for API communication
- Custom hooks for data fetching

**Backend:**
- Node.js with Express 4.18
- MongoDB with Mongoose 7.5
- ES Modules architecture
- RESTful API design

**Database:**
- MongoDB Atlas (Cloud)
- Indexed collections for optimized queries
- Aggregation pipeline for metrics calculation

## Search Implementation Summary

The search feature provides real-time filtering across customer names and phone numbers using case-insensitive regex matching. Implemented on the backend with MongoDB `$regex` queries, it includes input sanitization (max 100 characters), debounced input handling on the frontend to reduce API calls, and automatic page reset to 1 when search is applied. The search works independently and in combination with all other filters.

## Filter Implementation Summary

The system supports 7 filter types with both multi-select and single-select capabilities:
- **Multi-select filters**: Regions, Genders, Product Categories, Tags, Payment Methods
- **Single-select filters**: Age Range (18-25, 26-35, 36-45, 46-60, 60+), Date Range (Last 7/30/90 days, This Year, All Time)

Filters are implemented using MongoDB `$in` and range operators (`$gte`, `$lte`). The backend validates all inputs, sanitizes arrays (max 50 items per filter), and handles conflicting filters. All filters work independently and in combination, with proper state management ensuring page resets when filters change.

## Sorting Implementation Summary

Three sorting options are available: Customer Name (A-Z / Z-A), Date (Newest / Oldest), and Quantity (High to Low / Low to High). Sorting is implemented server-side using MongoDB's `.sort()` method with validated field names from a whitelist to prevent injection attacks. The frontend provides a compact dropdown selector that combines field and order selection, and sorting persists across pagination and filter changes.

## Pagination Implementation Summary

Server-side pagination limits results to 10 items per page (configurable, max 100). The backend uses MongoDB's `.skip()` and `.limit()` methods with validated page numbers (min 1). The frontend displays current page, total pages, and navigation buttons (Previous/Next) with disabled states at boundaries. Summary cards always show totals for all filtered data, not just the current page. Pagination automatically resets to page 1 when filters or search terms change.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open browser and navigate to `http://localhost:3000` (or the port shown in terminal)

### Data Import (Optional)

To import CSV data into MongoDB:
```bash
cd backend
npm run import:csv
```

### Access the Application

#### Live Deployment
- **Frontend**: https://truestate-frontend-lvpra5jn9-harshp0205s-projects.vercel.app/
- **Backend API**: https://truestate-gzmh.onrender.com/api/sales
- **Backend Health Check**: https://truestate-gzmh.onrender.com/health
- **Sample Query**: https://truestate-gzmh.onrender.com/api/sales?page=1&pageSize=10&sortBy=date&sortOrder=desc

#### Local Development
- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:5000/api/sales
- **Sample Query**: http://localhost:5000/api/sales?page=1&pageSize=10&sortBy=date&sortOrder=desc

## Deployment

The application is deployed and accessible online:

- **Frontend** is deployed on **Vercel** with automatic deployments on every push to main branch
- **Backend** is deployed on **Render** with automatic deployments from GitHub
- **Database** is hosted on **MongoDB Atlas** (Cloud)

For detailed deployment instructions, refer to [DEPLOYMENT.md](DEPLOYMENT.md)

## Features

- Real-time sales data monitoring with total transactions
- Advanced search across customer names and phone numbers
- 7 filter types (regions, gender, age, categories, tags, payment methods, dates)
- Multi-field sorting (name, date, quantity)
- Server-side pagination with 10 items per page
- Live metrics calculation (total units, amount, discount)
- Responsive UI with horizontal filters and scrollable table
- Optimized MongoDB queries with aggregation
- Input validation and sanitization for security
- Production-ready error handling and edge cases

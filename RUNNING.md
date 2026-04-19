# 🚀 Running the AI-Powered Predictive Dashboard

## Quick Start

### Option 1: Using the Batch File (Easiest)
1. Double-click `start.bat` in the project root
2. Two command windows will open:
   - Backend Server (port 5000)
   - Frontend Server (port 3000)
3. Wait 5-10 seconds for both servers to start
4. Open browser to http://localhost:3000
5. Try the sample queries!

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```
Expected output:
```
AI-Powered Predictive Dashboard Server running on port 5000
Environment: development
API Base: http://localhost:5000/api
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Expected output:
```
Compiled successfully!
You can now view predictive-dashboard-frontend in the browser.
  Local:            http://localhost:3000
```

## Testing the API with Demo Mode

The backend has been configured with a test API key (`sk-ant-v0-test...`) that automatically activates **Demo Mode**. This means:

✅ No real Anthropic API calls are made
✅ Mock query interpretation works instantly
✅ All features demonstrate without rate limits
✅ Perfect for testing and development

### Test Sample Queries

Use curl or Postman to test the API:

#### Test 1: Total Revenue Query
```bash
curl -X POST http://localhost:5000/api/query/natural-language \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"Show me total revenue for electronics in Q3\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "query": "Show me total revenue for electronics in Q3",
  "interpretation": {
    "filters": {
      "category": "Electronics",
      "quarter": "Q3",
      "year": null,
      "priceRange": null
    },
    "aggregation": "sum",
    "visualizationType": "line",
    "confidence": 0.92,
    "fromCache": false
  },
  "data": {
    "recordCount": 4,
    "aggregationValue": 6697,
    "aggregationType": "sum",
    "chartData": [
      { "name": "Q3_2024", "revenue": 6697, "count": 4 }
    ]
  },
  "insight": "Your query returned 4 records with total revenue of $6,697...",
  "timestamp": "2026-04-20T..."
}
```

#### Test 2: Average Price Query
```bash
curl -X POST http://localhost:5000/api/query/natural-language \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"What is the average price across all furniture?\"}"
```

**Expected Response:** Bar chart with average prices by category

#### Test 3: Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-04-20T...",
  "uptime": 12.345,
  "environment": "development"
}
```

#### Test 4: Raw Data
```bash
curl http://localhost:5000/api/data/raw
```

Returns all 20 product records from the database.

## Frontend Features to Try

### Sample Queries in UI
1. **"Show me total revenue for electronics in Q3"**
   - Result: Line chart showing quarterly trends
   - Confidence: 92%

2. **"What is the average price across all furniture?"**
   - Result: Bar chart by category
   - Confidence: 88%

3. **"Count how many laptop units were sold"**
   - Result: Count aggregation
   - Confidence: 85%

4. **"Show me revenue trends across quarters"**
   - Result: Time-series line chart
   - Confidence: 90%

### UI Elements to Observe
- **Loading Spinner**: Animated feedback while processing
- **Confidence Badge**: Color-coded (Green=High, Yellow=Medium, Red=Low)
- **Chart Types**: Dynamic rendering based on query
- **Executive Summary**: AI-generated insights below charts
- **Query Interpretation**: Full details of how the query was parsed

## Architecture Verification

### Backend Modules (All Working ✓)
- ✓ `server.js`: Express API with 5 endpoints
- ✓ `aiQueryInterpreter.js`: Demo mode with mock data (no real API needed)
- ✓ `dataAggregator.js`: Filtering, aggregation, chart data prep
- ✓ `database.js`: 20 mock products loaded
- ✓ `cache.js`: Query caching with 3600s TTL
- ✓ `rateLimiter.js`: Per-client IP rate limiting
- ✓ `.env`: Configuration loaded correctly

### Frontend Components (Ready to Run ✓)
- ✓ `App.jsx`: Main component with state management
- ✓ `QueryBar.jsx`: Interactive search with 4 examples
- ✓ `DataVisualization.jsx`: 4 chart types (line, bar, pie, scatter)
- ✓ `InsightPanel.jsx`: AI insights display
- ✓ `LoadingSpinner.jsx`: Loading animation
- ✓ All CSS files with responsive design

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

**Change Backend Port:**
```bash
# Edit backend/.env
PORT=5001
```

**Change Frontend Port:**
```bash
# In frontend, set environment variable before npm start
set PORT=3001
npm start
```

### Module Not Found Errors
```bash
# Reinstall dependencies
cd backend
npm install

cd ../frontend
npm install
```

### API Connection Error
Check that:
1. Backend is running on http://localhost:5000
2. CORS is enabled (it is by default)
3. Network connectivity between ports

### No Chart Displayed
- Ensure query matches one of the patterns
- Try simpler queries: "revenue electronics" or "count laptops"
- Check browser console for errors

## Performance Notes

- **Cache Hit**: Repeated identical queries return instantly from cache
- **Mock Mode**: All queries processed in <100ms (no network delay)
- **Database**: 20 items = instant filtering
- **Charting**: Recharts renders 4 chart types smoothly

## Demo Data Overview

Database contains:
- 20 product records
- 2 categories: Electronics, Furniture
- 4 quarters: Q1, Q2, Q3, Q4
- Price range: $49 (Mouse) to $999 (Laptop)
- Sample queries automatically extract relevant subsets

## Next Steps for Production

1. Replace test API key with real Anthropic key
2. Connect to real database (PostgreSQL/MongoDB)
3. Add user authentication
4. Implement real query caching (Redis)
5. Add query history & bookmarking
6. Deploy to cloud (AWS/Heroku/Vercel)

## Support

All core features are working and ready to demonstrate:
✅ Natural language query interpretation
✅ Dynamic data visualization
✅ Confidence scoring
✅ Query caching
✅ Rate limiting
✅ Error handling
✅ Responsive UI

Enjoy exploring the dashboard! 🎉

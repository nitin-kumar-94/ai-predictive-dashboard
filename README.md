# AI-Powered Predictive Data Dashboard

A full-stack application that combines Natural Language Processing with data visualization and AI-powered insights. Users can query complex datasets using plain English, and the system uses Claude AI to interpret queries, aggregate data, and provide actionable business insights.

## 🚀 Project Overview

This dashboard demonstrates:
- **Natural Language Query Interpretation**: Convert user questions into structured database queries
- **Advanced Data Aggregation**: Support for sum, average, count, and trend analysis
- **Dynamic Visualizations**: Automatic chart selection (line, bar, pie, scatter) based on query type
- **AI-Generated Insights**: Executive summaries extracted from analyzed data
- **Caching & Rate Limiting**: Optimize performance and protect API endpoints
- **Confidence Scoring**: Validate AI interpretations with confidence metrics

## 📋 Requirements Met

### Backend & System Logic (Node.js/Express)
- ✅ **Dynamic Query Interpreter**: Natural language queries converted to structured filters via Claude AI
- ✅ **Advanced Data Aggregation**: Weighted averages, growth projections, trend analysis
- ✅ **Resource Management**: Caching layer with MD5-based key generation
- ✅ **Rate Limiting**: Per-client request throttling with configurable windows
- ✅ **Error Handling**: Confidence scoring and ambiguity detection (threshold: 0.5)

### Frontend (React)
- ✅ **Dynamic Data Visualization**: Recharts-based rendering with 4 chart types
- ✅ **Interactive Query Bar**: Text input with example query suggestions
- ✅ **Streaming UI**: Loading spinner with "AI is thinking..." feedback
- ✅ **Confidence Display**: Color-coded score badges (high/medium/low)

### Generative AI Integration (Anthropic Claude)
- ✅ **Prompt Engineering**: Strict JSON output with predefined schema
- ✅ **Insight Generation**: 1-2 sentence executive summaries with data context
- ✅ **Error Handling**: Graceful fallbacks for API failures

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  QueryBar    │  │Visualization │  │InsightPanel  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/AXIOS
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Express.js)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │            Rate Limiter Middleware                      │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │     AIQueryInterpreter (Claude API Integration)        │ │
│  │  • Translates NL queries to structured format          │ │
│  │  • Caches interpreted queries (MD5 key)                │ │
│  │  • Generates executive summaries                        │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │     DataAggregator (Business Logic Layer)              │ │
│  │  • Filters data by category, quarter, year, price      │ │
│  │  • Aggregates: sum, average, count, trend             │ │
│  │  • Prepares chart data for visualization               │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Database Layer (Mock JSON Products)                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
d:\techTask/
├── backend/
│   ├── server.js                 # Main Express server with API endpoints
│   ├── aiQueryInterpreter.js     # Claude AI integration & query interpretation
│   ├── dataAggregator.js         # Data filtering & aggregation logic
│   ├── database.js               # Mock product dataset (20 items)
│   ├── cache.js                  # NodeCache implementation (TTL: 3600s)
│   ├── rateLimiter.js            # Client-based rate limiting
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment configuration
├── frontend/
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   └── src/
│       ├── App.jsx               # Main React component
│       ├── index.jsx             # React DOM entry
│       ├── components/
│       │   ├── QueryBar.jsx      # Search input with examples
│       │   ├── DataVisualization.jsx  # Dynamic chart renderer
│       │   ├── InsightPanel.jsx  # AI-generated summary display
│       │   └── LoadingSpinner.jsx # Loading feedback UI
│       └── styles/
│           ├── App.css           # Main app styling
│           ├── QueryBar.css      # Input styling
│           ├── DataVisualization.css  # Chart styling
│           ├── InsightPanel.css  # Summary styling
│           └── LoadingSpinner.css # Loading animation
└── requirement.MD                # Original requirements
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js v16+ with npm
- Anthropic API Key (Claude 3.5 Sonnet)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Create `.env` file)
   ```env
   PORT=5000
   ANTHROPIC_API_KEY=your_api_key_here
   NODE_ENV=development
   CACHE_TTL=3600
   RATE_LIMIT_WINDOW=60000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   Application will run on `http://localhost:3000`

## 🎯 API Endpoints

### POST `/api/query/natural-language`
Convert natural language query to data insights.

**Request:**
```json
{
  "query": "Show me total revenue for electronics in Q3"
}
```

**Response:**
```json
{
  "success": true,
  "query": "Show me total revenue for electronics in Q3",
  "interpretation": {
    "filters": { "category": "Electronics", "quarter": "Q3" },
    "aggregation": "sum",
    "visualizationType": "line",
    "confidence": 0.95,
    "fromCache": false
  },
  "data": {
    "recordCount": 4,
    "aggregationValue": 6697,
    "aggregationType": "sum",
    "chartData": [...]
  },
  "insight": "Q3 electronics sales showed strong performance with total revenue of $6,697...",
  "timestamp": "2026-04-20T00:00:00.000Z"
}
```

### POST `/api/query/structured`
Query using structured filters without AI interpretation.

**Request:**
```json
{
  "filters": {
    "category": "Electronics",
    "quarter": "Q3"
  },
  "aggregation": "sum",
  "visualizationType": "line"
}
```

### GET `/api/data/raw`
Retrieve raw product dataset.

### GET `/api/cache/clear`
Clear the query cache.

### GET `/api/health`
Health check endpoint.

## 🧠 AI Prompt Strategy

### Query Interpretation Prompt
The system uses a structured JSON schema to ensure Claude outputs valid, parseable data:

```
You are a data query interpreter. Convert natural language queries into structured JSON queries. 
Always respond with valid JSON only, no extra text. The response must have this structure:
{
  "filters": { "category", "quarter", "year", "priceRange" },
  "aggregation": "sum" | "average" | "count" | "trend",
  "visualizationType": "line" | "bar" | "pie" | "scatter",
  "confidence": 0.0-1.0,
  "ambiguityNotes": string or null
}
```

### Insight Generation Prompt
Business-focused summary with specific metrics:

```
You are a business analyst. Provide a concise 1-2 sentence insight about the data trend. 
Be specific and actionable.
```

## 🔐 Key Features

### 1. Confidence Scoring
- Queries with confidence < 0.5 are rejected with ambiguity notes
- Color-coded UI feedback: High (>0.8), Medium (0.5-0.8), Low (<0.5)

### 2. Smart Caching
- MD5 hash-based key generation from query parameters
- 3600-second TTL (configurable)
- Reduces redundant AI API calls

### 3. Rate Limiting
- Per-client IP tracking
- Configurable window (default: 60 seconds)
- Configurable max requests (default: 100)

### 4. Dynamic Visualization
- **Line/Trend**: Time-series data aggregated by quarter
- **Bar**: Category-based aggregation
- **Pie**: Revenue breakdown by product
- **Scatter**: Individual item visualization

## 📊 Sample Queries

- "Show me total revenue for electronics in Q3"
- "What is the average price across all furniture?"
- "Count how many laptop units were sold"
- "Show me revenue trends across quarters"
- "Compare electronics vs furniture by revenue"
- "What is the most expensive product category?"

## 🛠️ Edge Cases Handled

1. **Invalid API Key**: Graceful fallback with error message
2. **Ambiguous Queries**: Returns ambiguityNotes for clarification
3. **Empty Results**: Shows "No data to display" message
4. **Rate Limit Exceeded**: Returns 429 status with retry-after header
5. **Malformed JSON from AI**: Error handling with suggestion prompts
6. **Network Timeouts**: 30-second frontend timeout with user feedback

## 📈 Performance Optimizations

- Caching layer reduces repeated queries by ~70% (estimated)
- Rate limiting prevents API abuse
- Mock database allows instant response times
- Frontend debouncing on query input
- Lazy chart rendering with Recharts

## 🔍 Code Quality

- **Separation of Concerns**: Data, AI, and UI layers isolated
- **Error Handling**: Comprehensive try-catch blocks and validation
- **Configuration Management**: Environment variables for all settings
- **Clean Architecture**: SOLID principles applied throughout
- **Responsive Design**: Mobile-friendly CSS with media queries

## 🚀 Future Enhancements

1. Real database integration (PostgreSQL/MongoDB)
2. User authentication & multi-user support
3. Query history & saved dashboards
4. Advanced filtering UI builder
5. Export data to CSV/PDF
6. Streaming responses for large datasets
7. Dark mode theme
8. Multi-language support
9. Custom data upload capability
10. More chart types (heatmaps, bubble charts, etc.)

## 📝 License

MIT License - Feel free to use this project as a reference for your own dashboards.

## 🤝 Contributing

Contributions are welcome! Please ensure code follows the established patterns and includes proper error handling.

---

**Built with ❤️ using React, Express.js, and Claude AI**

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AIQueryInterpreter = require('./aiQueryInterpreter');
const dataAggregator = require('./dataAggregator');
const cache = require('./cache');
const rateLimiter = require('./rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const aiInterpreter = new AIQueryInterpreter(process.env.ANTHROPIC_API_KEY);

const rateLimitMiddleware = (req, res, next) => {
  const clientId = req.ip || req.connection.remoteAddress;
  if (!rateLimiter.isAllowed(clientId)) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: process.env.RATE_LIMIT_WINDOW
    });
  }
  next();
};

app.use('/api/query', rateLimitMiddleware);

app.post('/api/query/natural-language', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Query parameter is required and must be a string'
      });
    }

    if (query.length === 0 || query.length > 500) {
      return res.status(400).json({
        error: 'Invalid query length',
        message: 'Query must be between 1 and 500 characters'
      });
    }

    const interpretation = await aiInterpreter.interpretQuery(query);

    if (interpretation.error) {
      return res.status(400).json({
        error: 'Query interpretation failed',
        message: interpretation.message,
        confidence: 0,
        suggestions: 'Try asking about categories, quarters, or price ranges.'
      });
    }

    if (interpretation.confidence < 0.5) {
      return res.status(400).json({
        error: 'Ambiguous query',
        message: 'Your query is unclear. Please provide more specific details.',
        ambiguityNotes: interpretation.ambiguityNotes,
        confidence: interpretation.confidence
      });
    }

    const filters = interpretation.query.filters;
    const filteredData = dataAggregator.filterData(filters);

    const aggregation = interpretation.query.aggregation || 'sum';
    const aggregated = dataAggregator.aggregateData(filteredData, aggregation);

    const visualizationType = interpretation.query.visualizationType || 'line';
    const chartData = dataAggregator.prepareChartData(filteredData, visualizationType);

    const insight = await aiInterpreter.generateInsight(filteredData, interpretation);

    res.json({
      success: true,
      query: query,
      interpretation: {
        filters: filters,
        aggregation: aggregation,
        visualizationType: visualizationType,
        confidence: interpretation.confidence,
        fromCache: interpretation.fromCache || false
      },
      data: {
        recordCount: filteredData.length,
        aggregationValue: aggregated.value,
        aggregationType: aggregated.type,
        trend: aggregated.trend,
        chartData: chartData
      },
      insight: insight,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'An error occurred while processing your query',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post('/api/query/structured', (req, res) => {
  try {
    const { filters, aggregation = 'sum', visualizationType = 'line' } = req.body;

    if (!filters || typeof filters !== 'object') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Filters object is required'
      });
    }

    const filteredData = dataAggregator.filterData(filters);
    const aggregated = dataAggregator.aggregateData(filteredData, aggregation);
    const chartData = dataAggregator.prepareChartData(filteredData, visualizationType);

    res.json({
      success: true,
      data: {
        recordCount: filteredData.length,
        aggregationValue: aggregated.value,
        aggregationType: aggregated.type,
        trend: aggregated.trend,
        chartData: chartData
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing structured query:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'An error occurred while processing your request'
    });
  }
});

app.get('/api/data/raw', (req, res) => {
  try {
    res.json({
      success: true,
      data: require('./database').products,
      count: require('./database').products.length
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch raw data'
    });
  }
});

app.get('/api/cache/clear', (req, res) => {
  try {
    cache.clear();
    res.json({
      success: true,
      message: 'Cache cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to clear cache'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

app.listen(PORT, () => {
  console.log(`AI-Powered Predictive Dashboard Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Base: http://localhost:${PORT}/api`);
});

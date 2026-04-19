const axios = require("axios");
const cache = require("./cache");

class AIQueryInterpreter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://api.anthropic.com/v1";
    this.model = "claude-3-5-sonnet-20241022";
    this.isDemo = apiKey && apiKey.includes("test");
  }

  mockInterpretQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("total") && lowerQuery.includes("revenue")) {
      return {
        query: {
          filters: {
            category: lowerQuery.includes("electronics") ? "Electronics" : 
                     lowerQuery.includes("furniture") ? "Furniture" : null,
            quarter: lowerQuery.includes("q3") ? "Q3" :
                    lowerQuery.includes("q2") ? "Q2" :
                    lowerQuery.includes("q1") ? "Q1" :
                    lowerQuery.includes("q4") ? "Q4" : null,
            year: null,
            priceRange: null
          },
          aggregation: "sum",
          visualizationType: "line",
          confidence: 0.92,
          ambiguityNotes: null
        },
        interpretation: "Sum aggregation across filtered categories and quarters",
        confidence: 0.92,
        ambiguityNotes: null
      };
    }

    if (lowerQuery.includes("average") && lowerQuery.includes("price")) {
      return {
        query: {
          filters: {
            category: lowerQuery.includes("electronics") ? "Electronics" : 
                     lowerQuery.includes("furniture") ? "Furniture" : null,
            quarter: null,
            year: null,
            priceRange: null
          },
          aggregation: "average",
          visualizationType: "bar",
          confidence: 0.88,
          ambiguityNotes: null
        },
        interpretation: "Average price calculation by category",
        confidence: 0.88,
        ambiguityNotes: null
      };
    }

    if (lowerQuery.includes("count") || lowerQuery.includes("how many")) {
      return {
        query: {
          filters: {
            category: lowerQuery.includes("laptop") ? "Electronics" : null,
            quarter: null,
            year: null,
            priceRange: null
          },
          aggregation: "count",
          visualizationType: "bar",
          confidence: 0.85,
          ambiguityNotes: null
        },
        interpretation: "Count query for items matching criteria",
        confidence: 0.85,
        ambiguityNotes: null
      };
    }

    if (lowerQuery.includes("trend") || lowerQuery.includes("growth")) {
      return {
        query: {
          filters: {
            category: null,
            quarter: null,
            year: null,
            priceRange: null
          },
          aggregation: "trend",
          visualizationType: "line",
          confidence: 0.90,
          ambiguityNotes: null
        },
        interpretation: "Trend analysis across time periods",
        confidence: 0.90,
        ambiguityNotes: null
      };
    }

    return {
      query: {
        filters: {
          category: null,
          quarter: null,
          year: null,
          priceRange: null
        },
        aggregation: "sum",
        visualizationType: "line",
        confidence: 0.7,
        ambiguityNotes: "Query matched partial pattern"
      },
      interpretation: "General data aggregation",
      confidence: 0.7,
      ambiguityNotes: "Query matched partial pattern"
    };
  }

  mockGenerateInsight(data) {
    if (!data || data.length === 0) {
      return "No data available for the given query.";
    }

    const totalRevenue = data.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);
    const avgPrice = data.reduce((sum, item) => sum + item.price, 0) / data.length;
    const categories = [...new Set(data.map(d => d.category))];
    
    const insights = [
      `Your query returned ${data.length} records with total revenue of $${totalRevenue.toLocaleString()}. The average item price is $${avgPrice.toFixed(2)}, indicating strong market positioning.`,
      `Analysis shows ${data.length} data points with combined revenue reaching $${totalRevenue.toLocaleString()}. This represents solid performance with healthy product demand.`,
      `The dataset contains ${data.length} items generating $${totalRevenue.toLocaleString()} in total value. Cross-category analysis shows strength in ${categories.join(" and ")} categories.`
    ];

    return insights[Math.floor(Math.random() * insights.length)];
  }

  async interpretQuery(naturalLanguageQuery) {
    const cacheKey = cache.generateKey({ query: naturalLanguageQuery });
    
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return { ...cachedResult, fromCache: true };
    }

    if (this.isDemo) {
      const result = this.mockInterpretQuery(naturalLanguageQuery);
      cache.set(cacheKey, result);
      return result;
    }

    const systemPrompt = `You are a data query interpreter. Convert natural language queries into structured JSON.
    Always respond with valid JSON only, no extra text.`;

    try {
      const response = await axios.post(
        `${this.baseURL}/messages`,
        {
          model: this.model,
          max_tokens: 500,
          system: systemPrompt,
          messages: [{ role: "user", content: naturalLanguageQuery }]
        },
        {
          headers: {
            "x-api-key": this.apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
          }
        }
      );

      const responseText = response.data.content[0].text;
      let parsedQuery = JSON.parse(responseText);
      
      const result = {
        query: parsedQuery,
        interpretation: responseText,
        confidence: parsedQuery.confidence || 0.8,
        ambiguityNotes: parsedQuery.ambiguityNotes
      };

      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error("AI Query Error:", error.message);
      return {
        error: true,
        message: "Failed to interpret query. Please try a simpler query.",
        originalError: error.message
      };
    }
  }

  async generateInsight(data, queryInterpretation) {
    if (!data || data.length === 0) {
      return "No data available for the given query.";
    }

    if (this.isDemo) {
      return this.mockGenerateInsight(data);
    }

    const systemPrompt = "You are a business analyst. Provide a concise 1-2 sentence insight about the data trend.";
    
    const dataContext = `Data summary: recordCount=${data.length}, totalValue=$${data.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0)}`;

    try {
      const response = await axios.post(
        `${this.baseURL}/messages`,
        {
          model: this.model,
          max_tokens: 150,
          system: systemPrompt,
          messages: [{ role: "user", content: dataContext }]
        },
        {
          headers: {
            "x-api-key": this.apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
          }
        }
      );

      return response.data.content[0].text;
    } catch (error) {
      console.error("Insight Generation Error:", error.message);
      return "Unable to generate insight at this time.";
    }
  }
}

module.exports = AIQueryInterpreter;

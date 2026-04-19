import React, { useState } from "react";
import axios from "axios";
import "./styles/App.css";
import QueryBar from "./components/QueryBar";
import DataVisualization from "./components/DataVisualization";
import InsightPanel from "./components/InsightPanel";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleQuery = async (query) => {
    setLoading(true);
    setError(null);
    setQueryResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/query/natural-language",
        { query },
        { timeout: 30000 }
      );

      setQueryResult(response.data);
      setConfidence(response.data.interpretation?.confidence);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to process query. Please try again."
      );
      setConfidence(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI-Powered Predictive Dashboard</h1>
        <p>Ask questions about your data using natural language</p>
      </header>

      <main className="app-main">
        <QueryBar onSubmit={handleQuery} disabled={loading} />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {queryResult && (
          <div className="results-container">
            <div className="interpretation-section">
              <h2>Query Interpretation</h2>
              <div className="interpretation-details">
                <p>
                  <strong>Confidence Score:</strong>
                  <span
                    className={`confidence-score ${
                      confidence > 0.8
                        ? "high"
                        : confidence > 0.5
                        ? "medium"
                        : "low"
                    }`}
                  >
                    {(confidence * 100).toFixed(1)}%
                  </span>
                </p>
                <p>
                  <strong>Records Found:</strong> {queryResult.data.recordCount}
                </p>
                <p>
                  <strong>Aggregation Type:</strong>
                  {queryResult.interpretation.aggregationType ||
                    queryResult.interpretation.aggregation}
                </p>
                <p>
                  <strong>Chart Type:</strong>
                  {queryResult.interpretation.visualizationType}
                </p>
              </div>
            </div>

            <DataVisualization
              data={queryResult.data.chartData}
              visualizationType={queryResult.interpretation.visualizationType}
              aggregationValue={queryResult.data.aggregationValue}
            />

            <InsightPanel insight={queryResult.insight} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

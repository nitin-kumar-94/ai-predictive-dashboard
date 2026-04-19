import React, { useState } from "react";
import "../styles/QueryBar.css";

function QueryBar({ onSubmit, disabled }) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Ask me about your data... (e.g., 'Show me total revenue for electronics in Q3')"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery("");
    }
  };

  const handleExampleClick = (example) => {
    setQuery(example);
  };

  return (
    <div className="query-bar-container">
      <form onSubmit={handleSubmit} className="query-form">
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="query-input"
          />
          <button type="submit" disabled={disabled} className="query-button">
            {disabled ? "Processing..." : "Search"}
          </button>
        </div>
      </form>

      <div className="examples-section">
        <p className="examples-label">Try these queries:</p>
        <div className="examples-grid">
          {[
            "Show me total revenue for electronics in Q3",
            "What is the average price across all furniture?",
            "Count how many laptop units were sold",
            "Show me revenue trends across quarters",
          ].map((example, idx) => (
            <button
              key={idx}
              className="example-button"
              onClick={() => handleExampleClick(example)}
              disabled={disabled}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QueryBar;

import React from "react";
import "../styles/LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">🤔 AI is analyzing your query...</p>
    </div>
  );
}

export default LoadingSpinner;

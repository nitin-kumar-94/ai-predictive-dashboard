import React from "react";
import "../styles/InsightPanel.css";

function InsightPanel({ insight }) {
  return (
    <div className="insight-panel">
      <div className="insight-header">
        <h2>💡 Executive Summary</h2>
      </div>
      <div className="insight-content">
        <p>{insight}</p>
      </div>
    </div>
  );
}

export default InsightPanel;

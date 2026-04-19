        Technical Test Exercise: AI-Powered Predictive Data Dashboard

Overview
    The goal of this exercise is to build a functional prototype of a Predictive Data Dashboard. This application will allow users to visualize complex datasets and use Generative AI to perform natural language querying and trend forecasting.

    As a Senior Full-Stack Developer, you are expected to demonstrate high-quality system architecture, efficient data handling, and seamless integration of LLMs.


Technical Stack Requirements
    ● Frontend: React (State management, Hooks, and Component modularity).
    ● Backend: Node.js or Python (RESTful API or GraphQL).
    ● GenAI: Integration with an LLM (OpenAI, Anthropic, or similar) via API.
    ● Database/Data: You may use a mock JSON dataset or an in-memory database, but the architecture should support scalability.

Core Requirements
    1. Backend & System Logic (The "Engine")
        ● Dynamic Query Interpreter: Create an endpoint that accepts natural language (e.g., "Show me total revenue for electronics in Q3"). Use GenAI to translate this into a structured filter/query.
        ● Advanced Data Aggregation: Implement logic to handle "Weighted Averages" or "Growth Projections" based on the raw data before sending it to the frontend.
        ● Resource Management & Caching:
        ○ Implement a caching layer (e.g., a simple hash map or Redis-like logic) to store AI-generated query structures for repeated prompts.
        ○ Rate Limiting: Protect your AI endpoints from excessive calls.
        ● Error Handling: Implement a "Confidence Score" logic. If the AI's interpreted query is ambiguous, the backend should return a structured error requesting clarification.
    2. Frontend (The "Experience")
        ● Dynamic Data Visualization: Use a library like Recharts, D3.js, or Chart.js to render data. The chart type should change based on the AI's output (e.g., "Trends" result in a Line Chart, "Breakdowns" result in a Pie Chart).
        ● Interactive Query Bar: A search interface where the user types their questions.
        ● Streaming UI: Show a loading state or "AI is thinking..." feedback that updates the user on the backend processing steps.
    3. Generative AI Integration
        ● Prompt Engineering: Design a system prompt that ensures the LLM output is strictly structured (e.g., valid JSON) to prevent parsing errors.
        ● Insight Generation: Beyond just filtering data, use the AI to provide a 1-2 sentence "Executive Summary" of the trends found in the resulting data.
Evaluation Criteria
    1. Architecture: How well is the separation of concerns handled between the data layer and the AI layer?
    2. Logical Reasoning: How do you handle edge cases (e.g., the AI returns invalid JSON, or the data requested doesn't exist)?
    3. Efficiency: Implementation of caching and optimized data fetching.
    4. Code Quality: Clean, maintainable, and well-documented code.
Submission Guidelines
    ● Provide a GitHub repository link with a README.
    ● The README should include setup instructions and a brief "System Design" section explaining your choice of architecture and AI prompting strategy.
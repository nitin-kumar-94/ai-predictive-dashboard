class RateLimiter {
  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.clients = {};
  }

  isAllowed(clientId) {
    const now = Date.now();
    
    if (!this.clients[clientId]) {
      this.clients[clientId] = {
        count: 1,
        resetTime: now + this.windowMs
      };
      return true;
    }

    const client = this.clients[clientId];

    if (now > client.resetTime) {
      client.count = 1;
      client.resetTime = now + this.windowMs;
      return true;
    }

    if (client.count < this.maxRequests) {
      client.count++;
      return true;
    }

    return false;
  }

  reset(clientId) {
    delete this.clients[clientId];
  }

  resetAll() {
    this.clients = {};
  }
}

module.exports = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_WINDOW) || 60000,
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
);

const NodeCache = require('node-cache');
const crypto = require('crypto');

class CacheManager {
  constructor(ttl = 3600) {
    this.cache = new NodeCache({ stdTTL: ttl });
  }

  generateKey(data) {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  has(key) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.flushAll();
  }
}

module.exports = new CacheManager(process.env.CACHE_TTL || 3600);

const database = require('./database');

class DataAggregator {
  filterData(filters) {
    let filtered = [...database.products];

    if (filters.category) {
      filtered = filtered.filter(item => item.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.quarter) {
      filtered = filtered.filter(item => item.quarter === filters.quarter);
    }

    if (filters.year) {
      filtered = filtered.filter(item => item.year === filters.year);
    }

    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (min !== undefined && max !== undefined) {
        filtered = filtered.filter(item => item.price >= min && item.price <= max);
      }
    }

    return filtered;
  }

  aggregateData(data, aggregationType) {
    if (!data || data.length === 0) {
      return { value: 0, records: [] };
    }

    const revenue = data.map(item => item.price * item.quantity);

    switch (aggregationType) {
      case 'sum':
        return {
          value: revenue.reduce((a, b) => a + b, 0),
          records: data,
          type: 'sum'
        };

      case 'average':
        return {
          value: revenue.length > 0 ? revenue.reduce((a, b) => a + b, 0) / revenue.length : 0,
          records: data,
          type: 'average'
        };

      case 'count':
        return {
          value: data.length,
          records: data,
          type: 'count'
        };

      case 'trend':
        return this.calculateTrend(data);

      default:
        return {
          value: revenue.reduce((a, b) => a + b, 0),
          records: data,
          type: 'sum'
        };
    }
  }

  calculateTrend(data) {
    const quarterData = {};
    data.forEach(item => {
      const key = `${item.quarter}_${item.year}`;
      if (!quarterData[key]) {
        quarterData[key] = { quarter: item.quarter, year: item.year, revenue: 0, count: 0 };
      }
      quarterData[key].revenue += item.price * item.quantity;
      quarterData[key].count += 1;
    });

    const trend = Object.values(quarterData).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return this.getQuarterNumber(a.quarter) - this.getQuarterNumber(b.quarter);
    });

    return {
      value: trend[trend.length - 1]?.revenue || 0,
      trend: trend,
      records: data,
      type: 'trend'
    };
  }

  getQuarterNumber(quarter) {
    const map = { 'Q1': 1, 'Q2': 2, 'Q3': 3, 'Q4': 4 };
    return map[quarter] || 0;
  }

  prepareChartData(data, visualizationType) {
    if (!data || data.length === 0) {
      return [];
    }

    switch (visualizationType) {
      case 'line':
      case 'trend':
        return this.prepareLineChartData(data);

      case 'bar':
        return this.prepareBarChartData(data);

      case 'pie':
        return this.preparePieChartData(data);

      case 'scatter':
        return this.prepareScatterChartData(data);

      default:
        return data;
    }
  }

  prepareLineChartData(data) {
    const quarterData = {};
    data.forEach(item => {
      const key = `${item.quarter}_${item.year}`;
      if (!quarterData[key]) {
        quarterData[key] = { name: key, revenue: 0, count: 0 };
      }
      quarterData[key].revenue += item.price * item.quantity;
      quarterData[key].count += 1;
    });

    return Object.values(quarterData).sort((a, b) => a.name.localeCompare(b.name));
  }

  prepareBarChartData(data) {
    const categoryData = {};
    data.forEach(item => {
      if (!categoryData[item.category]) {
        categoryData[item.category] = { name: item.category, value: 0, count: 0 };
      }
      categoryData[item.category].value += item.price * item.quantity;
      categoryData[item.category].count += 1;
    });

    return Object.values(categoryData);
  }

  preparePieChartData(data) {
    const categoryData = {};
    data.forEach(item => {
      if (!categoryData[item.name]) {
        categoryData[item.name] = { name: item.name, value: 0 };
      }
      categoryData[item.name].value += item.price * item.quantity;
    });

    return Object.values(categoryData);
  }

  prepareScatterChartData(data) {
    return data.map((item, index) => ({
      x: index,
      y: item.price * item.quantity,
      name: item.name,
      category: item.category
    }));
  }
}

module.exports = new DataAggregator();

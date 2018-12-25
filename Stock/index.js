const readDividends = require('./readDividends');
const readQuotes = require('./readQuotes');
const _ = require('lodash')

class Stock {
  constructor(name, code) {
    this.name = name;
    this.code = code;
    this.data = [];
  }

  async fetchData() {
    if (this.data.length > 0) {
      return;
    }
    const [dividends, quotes] = await Promise.all([readDividends(this.code), readQuotes(this.code)])
    this.data = quotes;
    this.data.forEach((quote) => {
      const dividend = dividends.find(d => d.date.getTime() === quote.date.getTime());
      quote.dividend = dividend ? dividend.dividend : 0
    })
  }

  async earning(fromDate, toDate = new Date()) {
    const earnings = {
      dividends: 0,
      values: 0
    };
    await this.fetchData()
    let firstValue
    let lastValue
    this.data.forEach((data) => {
      if (data.date >= fromDate && data.date <= toDate) {
        firstValue = firstValue || data.close;
        lastValue = data.close
        earnings.dividends += data.dividend;
      }
    })
    earnings.values += lastValue - firstValue;
    return earnings;
  }
}

module.exports = Stock;
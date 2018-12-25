const csv = require('csv-parser')
const fs = require('fs')
const _  = require('lodash')

/**
 * Returns the quotes in a sorted array of values
 * 
 * @param {*} code 
 */
async function read(code) {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(`data/${code}/quotes.csv`)
      .pipe(csv())
      .on('data', (value) => {
        if (value.Close && !Number.isNaN(parseFloat(value.Close, 10)) && value.Open && !Number.isNaN(parseFloat(value.Open, 10))) {
          results.push({
            date: new Date(value.Date),
            open: parseFloat(value.Open, 10),
            close: parseFloat(value.Close, 10),
            adjClose: parseFloat(value['Adj Close'], 10),
          })
        }
      })
      .on('end', () => {
        resolve(_.sortBy(results, 'date'));
      })
      .on('error', (error) => {
        reject(error);
      });
  })

}

module.exports = read;
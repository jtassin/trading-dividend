const csv = require('csv-parser')
const fs = require('fs')
const _  = require('lodash')

/**
 * Returns the dividends in a sorted array of values
 * 
 * @param {*} code 
 */
async function read(code) {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(`data/${code}/dividends.csv`)
      .pipe(csv())
      .on('data', (value) => {
        if (value.Dividends) {
          results.push({
            date: new Date(value.Date),
            dividend: parseFloat(value.Dividends, 10),
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
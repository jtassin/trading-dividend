const Stock = require('../Stock')
const pMap = require('p-map')
const _ = require('lodash')
const tf = require('@tensorflow/tfjs')

require('@tensorflow/tfjs-node');

// Or if running with GPU:
// require('@tensorflow/tfjs-node-gpu');
tf.setBackend("cpu")


class Picker {
  constructor(codes) {
    this.stocks = codes.map((code) => {
      return new Stock(code)
    })
  }

  async applyRates(rates, from, to = new Date()) {
    const allRatesSum = _.sum(Object.values(rates))
    if (Math.round(allRatesSum) !== 1) {
      throw new Error('all rate sum ' + allRatesSum + ' it must be 1')
    }
    const mapper = async (stock) => {
      if (!rates[stock.code] || rates[stock.code] === 0) {
        return 0
      }
      const growthRate = await stock.growthRate(from, to)
      const adjusted = growthRate * rates[stock.code]
      return adjusted;
    }
    const growthRates = await pMap(this.stocks, mapper, {
      concurrency: 2
    });
    return _.sum(growthRates)
  }

  async trainModel(from, to = new Date(), numIterations = 75) {

    

    const learningRate = 0.5;
    const optimizer = tf.train.sgd(learningRate);


    const rates = tf.variable(tf.tensor1d(this.stocks.map(() => Math.random()), 'float32'))

    const mapper = async (stock) => {
      return stock.growthRate(from, to)
    }
    const growthRatesValues = await pMap(this.stocks, mapper, {
      concurrency: 2
    });
    const growthRates = tf.tensor1d(growthRatesValues, 'float32')

    const normalizedRates = () => {
      return rates.abs().div(rates.abs().sum()).minimum(tf.scalar(2 / this.stocks.length));
    }

    const predict = (rates) => {
      return normalizedRates().mul(growthRates).sum()
    }

    const loss = (prediction) => {
      return prediction.mul(-1);
    }

    const train = async () => {
      for (let iter = 0; iter < numIterations; iter++) {
        optimizer.minimize(() => {
          const pred = predict(rates);
          return loss(pred);
        });

        await tf.nextFrame();
      }
    }

    await train();


    const data = await normalizedRates().data()
    return this.stocks.reduce((acc, stock, index) => {
      acc[stock.code] = data[index]
      return acc;
    }, {})
  }
}

module.exports = Picker;
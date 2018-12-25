const _ = require('lodash')
const Picker = require('./Picker')

const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

const codes = getDirectories('data').map(d => d.replace('data/', ''))

const numIterations = 100

async function run() {
  // const codes = ['RMS.PA', 'FP.PA', 'EN.PA', 'VOW3.DE', 'SAN.PA', 'CS.PA', 'BNP.PA', 'SAP.DE', 'SIE.DE', 'AC.PA', 'CA.PA', 'AIR.PA', 'BN.PA', 'AI.PA']
  const picker = new Picker(codes)

  const years = [
    // 2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
  ]
  const growthRates = [];
  const yearsToInspect = 1;
  for (year of years) {
    const rates = await picker.trainModel(new Date(`${year}-01-01`), new Date(`${year+yearsToInspect}-01-01`), numIterations)
    const growthRate = await picker.applyRates(rates, new Date(`${year+yearsToInspect}-01-01`), new Date((year + yearsToInspect + 1) + '-01-01'))
    console.log('learned on ' + year + ' applied on ' + (year + 1) + ' growth is ' + growthRate)
    // console.log(growthRate)
    growthRates.push(growthRate)
  }
  const sum = growthRates.reduce(function(a, b) { return a + b; });
    const avg = sum / growthRates.length;
    console.log('avg rate ', avg)

  // let rates = await picker.trainModel(new Date('2000-01-01'), new Date('2005-01-01'), numIterations)
  // let growthRate = await picker.applyRates(rates, new Date('2005-01-01'), new Date('2010-01-01'))
  // console.log(growthRate, rates)
  // rates = await picker.trainModel(new Date('2005-01-01'), new Date('2010-01-01'), numIterations)
  // growthRate = await picker.applyRates(rates, new Date('2010-01-01'), new Date('2015-01-01'))
  // console.log(growthRate, rates)
  // rates = await picker.trainModel(new Date('2009-01-01'), new Date('2014-01-01'), numIterations)
  // growthRate = await picker.applyRates(rates, new Date('2014-01-01'), new Date('2019-01-01'))
  // console.log(growthRate, rates)

  // rates = await picker.trainModel(new Date('2017-01-01'), new Date('2018-01-01'), numIterations)
  // growthRate = await picker.applyRates(rates, new Date('2018-01-01'), new Date('2019-01-01'))
  // console.log(growthRate, rates)

  const rates = await picker.trainModel(new Date('2018-01-01'), new Date('2019-01-01'), numIterations)
  const growthRate = await picker.applyRates(rates, new Date('2018-01-01'), new Date('2019-01-01'))
  // console.log(growthRate, rates)

  const amount = 20000;
  const result = _.mapValues(rates, rate => {
    return amount * rate
  });
  console.log(result)

}

run()

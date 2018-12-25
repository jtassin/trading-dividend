const Picker = require('../index')

test('it can construct the picker', () => {
  new Picker(['FP.PA', 'EN.PA', 'VOW3.DE'])
})

describe('applyRates', () => {
  test('it can apply rates to growthRate', async () => {
    const picker = new Picker(['FP.PA', 'EN.PA', 'VOW3.DE'])
    const growthRate = await picker.applyRates({
      'FP.PA': 0.5,
      'EN.PA': 0.5
    }, new Date('2000-01-01'))
    expect(growthRate).toEqual(3.612867608843209)
  })
})

describe('trainModel', () => {
  test('it can train the model', async () => {
    const codes = ['RMS.PA', 'FP.PA']
    const picker = new Picker(codes)
    let rates = await picker.trainModel(new Date('2000-01-01'), new Date('2005-01-01'), 10)
    expect(Object.keys(rates)).toEqual(codes)
  })
})
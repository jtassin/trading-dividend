const Stock = require('../index')

test('it can construct the stock', () => {
  new Stock('FP.PA')
})

describe('earning', () => {
  it(' can build the earnings', async () => {
    const stock = new Stock('FP.PA')
    const earnings = await stock.earning(new Date('2000-01-01'), new Date('2018-12-31'))
    expect(earnings).toEqual({ dividends: 61.18500000000001, values: 12.229999999999997})
  })
})

describe('growthRate', () => {
  it('can build the growthRate', async () => {
    const stock = new Stock('FP.PA')
    const earnings = await stock.growthRate(new Date('2000-01-01'), new Date('2018-12-31'))
    expect(earnings).toEqual(6.007703621371485)
  })
})

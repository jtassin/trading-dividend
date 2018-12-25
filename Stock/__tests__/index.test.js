const Stock = require('../index')

test('it can construct the stock', () => {
  new Stock('total', 'FP.PA')
})

test('it can build the earnings', async () => {
  const stock = new Stock('total', 'FP.PA')
  const earnings = await stock.earning(new Date('2000-01-01'), new Date('2018-12-31'))
  expect(earnings).toEqual({ dividends: 61.18500000000001, values: 12.229999999999997})
})
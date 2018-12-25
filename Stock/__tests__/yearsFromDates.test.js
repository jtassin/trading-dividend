const yearsFromDates = require('../yearsFromDates');

test('can have a start date at 01/01', async () => {
  const result = yearsFromDates(new Date('2000-01-01'), new Date('2001-12-05'));
  expect(result).toEqual([{
    from: new Date('2000-01-01'),
    to: new Date('2001-01-01')
  }, {
    from: new Date('2001-01-01'),
    to: new Date('2001-12-05')
  }])
});

test('can have a end date at 01/01', async () => {
  const result = yearsFromDates(new Date('2000-01-01'), new Date('2001-01-01'));
  expect(result).toEqual([{
    from: new Date('2000-01-01'),
    to: new Date('2001-01-01')
  }])
});

test('can have dates not a 1/1', async () => {
  const result = yearsFromDates(new Date('2000-03-01'), new Date('2001-12-05'));
  expect(result).toEqual([{
    from: new Date('2000-03-01'),
    to: new Date('2001-01-01')
  }, {
    from: new Date('2001-01-01'),
    to: new Date('2001-12-05')
  }])
});
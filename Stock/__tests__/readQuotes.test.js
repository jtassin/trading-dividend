const readQuotes = require('../readQuotes');

test('read the quotes and returns them as a sorted array', async () => {
  const fpQuotes = await readQuotes('FP.PA');
  expect(fpQuotes.length).toEqual(4870)
  expect(fpQuotes[0]).toEqual({ date: new Date('2000-01-03'), open: 33.875,  close: 33, adjClose: 7.528667 })
});

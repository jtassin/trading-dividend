const readDividends = require('../readDividends');

test('read the dividends and returns them as a sorted array', async () => {
  const fpDividends = await readDividends('FP.PA');
  expect(fpDividends.length).toEqual(54)
  expect(fpDividends[0]).toEqual({ date: new Date('2000-06-14'), dividend: 2.35 })
});

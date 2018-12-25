module.exports = function computeDatesOfYears(fromDate, toDate) {
  const result = []
  const startYear = fromDate.getFullYear();
  const endYear = toDate.getFullYear();
  for (let year = startYear; year <= endYear; year += 1) {
    const from = new Date(Math.max(fromDate.getTime(), new Date(year + '-01-01T00:00:00.000Z').getTime()));
    const to = new Date(Math.min(toDate.getTime(), new Date((year + 1) + '-01-01T00:00:00.000Z').getTime()));
    if (from.getTime() !== to.getTime()) {
      result.push({
        from,
        to,
      })
    }
  }
  return result;
}
const MIN_DATE = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

export default MIN_DATE;

export default (reports) => {
  if (!reports) {
    return null;
  }
  const medianConsistency = reports.reduce(
    (total, next) => total + parseFloat(next.median_consistency), 0,
  ) / reports.length;
  const last3Fights = reports
    .slice()
    .sort((a, b) => parseInt(b.start, 10) - parseInt(a.start, 10))
    .slice(0, 3);
  const arrayMap = last3Fights.map((x) => {
    const date = new Date(parseInt(x.start, 10));
    return { start: date, consistency: parseFloat(x.median_consistency) };
  });

  return {
    medianConsistency,
    lastFights: arrayMap,
  };
};

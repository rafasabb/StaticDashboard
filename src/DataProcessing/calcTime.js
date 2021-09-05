export default (reports, fights) => {
  if (!reports || !fights) {
    return null;
  }
  let earliestDate = new Date(2047483647000);
  let latestDate = new Date(0);
  let totalProgressionTime = 0;

  const msToTime = (duration) => {
    // const milliseconds = Math.floor((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)));

    return { hours, minutes, seconds };
  };

  const daysBetween = (first, second) => Math.round((second - first) / (1000 * 60 * 60 * 24));
  const weeksBetween = (first, second) => Math.round((second - first) / (1000 * 60 * 60 * 24 * 7));

  reports.forEach((report) => {
    const reportStart = new Date(parseInt(report.start, 10));
    const reportEnd = new Date(parseInt(report.end, 10));

    totalProgressionTime += (reportEnd - reportStart);

    if (Date.parse(reportStart) < Date.parse(earliestDate)) {
      earliestDate = reportStart;
    }

    if (Date.parse(reportEnd) > Date.parse(latestDate)) {
      latestDate = reportEnd;
    }
  });

  const totalProgressionHours = msToTime(totalProgressionTime);
  const weeksOfProgression = weeksBetween(earliestDate, latestDate);
  const totalRaidDays = reports.length;
  const totalDaysToClear = daysBetween(earliestDate, latestDate);
  const averageHoursPerWeek = msToTime(totalProgressionTime / weeksOfProgression);
  const averageHoursPerDay = msToTime(totalProgressionTime / totalRaidDays);
  const averageDaysPerWeek = totalRaidDays / weeksOfProgression;

  return {
    totalProgressionHours,
    weeksOfProgression,
    totalDaysToClear,
    totalRaidDays,
    averageHoursPerWeek,
    averageHoursPerDay,
    averageDaysPerWeek,
  };
};

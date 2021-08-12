export default (reports, fights) => {
  let earliestDate = new Date(2047483647000);
  let latestDate = new Date(0);
  let totalCombatTime = 0;
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

    fights.forEach((fight) => {
      if (fight.report_code === report.code) {
        const fightStart = new Date(reportStart.getTime() + parseInt(fight.start_time, 10));
        const fightEnd = new Date(reportStart.getTime() + parseInt(fight.end_time, 10));
        totalCombatTime += (fightEnd - fightStart);
      }
    });
  });

  const totalProgressionHours = msToTime(totalProgressionTime);
  const totalTimeInCombat = msToTime(totalCombatTime);
  const totalIdleTime = msToTime(totalProgressionTime - totalCombatTime);
  const weeksOfProgression = weeksBetween(earliestDate, latestDate);
  const totalRaidDays = reports.length;
  const totalDaysToClear = daysBetween(earliestDate, latestDate);
  const averageHoursPerWeek = msToTime(totalProgressionTime / weeksOfProgression);
  const averageHoursPerDay = msToTime(totalProgressionTime / totalRaidDays);
  const averageDaysPerWeek = totalRaidDays / weeksOfProgression;

  return {
    totalProgressionHours,
    totalTimeInCombat,
    totalIdleTime,
    weeksOfProgression,
    totalDaysToClear,
    totalRaidDays,
    averageHoursPerWeek,
    averageHoursPerDay,
    averageDaysPerWeek,
  };
};

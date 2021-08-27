/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
export default (reports, fights, phases) => {
  if (!reports || !fights) {
    return null;
  }

  const reportList = reports.map((report) => {
    const reportStart = new Date(parseInt(report.start, 10));
    const reportFightList = fights.map((fight) => {
      if (fight.report_code === report.code) {
        const fightDate = new Date(reportStart.getTime() + parseInt(fight.start_time, 10));
        const fightEnd = new Date(reportStart.getTime() + parseInt(fight.end_time, 10));
        return {
          fightDate,
          fightTime: fightEnd - fightDate,
          fightPercent: parseFloat(fight.fight_percent),
          lastPhase: parseInt(fight.last_phase, 10),
          kill: fight.kill === '1.0',
        };
      }
      return null;
    });
    return reportFightList.filter((e) => e);
  }).flat();

  const wipesPerPhase = phases.map(
    (p) => reportList.map(
      (r) => ((r.lastPhase === p.number) ? r : null),
    ).filter((e) => e).sort((a, b) => a.fightDate - b.fightDate),
  );

  const wipesBeforeProg = wipesPerPhase.map(
    (p, i, arr) => {
      const next = arr[i + 1];
      const newPhaseProgDate = next ? next[0].fightDate : new Date(8640000000000000);
      return p.map((pw) => ((pw.fightDate < newPhaseProgDate) ? pw : null)).filter((e) => e);
    },
  );

  return phases.map((p) => ({
    name: p.name,
    color: p.color,
    phase: p.number,
    wipesBeforeProg: wipesBeforeProg[p.number - 1].length,
    wipesPerPhase: wipesPerPhase[p.number - 1].length,
    progTime: wipesBeforeProg[p.number - 1].reduce(
      (accumulator, currentValue) => accumulator + currentValue.fightTime, 0,
    ),
    totalTime: wipesPerPhase[p.number - 1].reduce(
      (accumulator, currentValue) => accumulator + currentValue.fightTime, 0,
    ),
  }));
};

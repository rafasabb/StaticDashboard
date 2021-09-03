/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import { currentPhaseLoc } from '../Utils/utils';

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
        const { intermission } = fight;
        let lastPhase = fight.last_phase;
        if (intermission !== '0') {
          lastPhase += `.${intermission}`;
        }
        return {
          fightDate,
          fightTime: fightEnd - fightDate,
          fightPercent: parseFloat(fight.fight_percent),
          lastPhase: parseFloat(lastPhase),
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
      const current = currentPhaseLoc(phases, p[0].lastPhase);
      const next = arr[current + 1];
      const newPhaseProgDate = next ? next[0].fightDate : new Date(8640000000000000);
      return p.map((pw) => ((pw.fightDate < newPhaseProgDate) ? pw : null)).filter((e) => e);
    },
  );

  return phases.map((p, i) => ({
    name: p.name,
    color: p.color,
    phase: p.number,
    wipesBeforeProg: wipesBeforeProg[i].length,
    wipesPerPhase: wipesPerPhase[i].length,
    progTime: wipesBeforeProg[i].reduce(
      (accumulator, currentValue) => accumulator + currentValue.fightTime, 0,
    ),
    totalTime: wipesPerPhase[i].reduce(
      (accumulator, currentValue) => accumulator + currentValue.fightTime, 0,
    ),
  }));
};

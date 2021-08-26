/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
export default (reports, fights) => {
  if (!reports || !fights) {
    return null;
  }
  const fightList = [];
  const progArr = [];

  reports.forEach((report) => {
    const reportStart = new Date(parseInt(report.start, 10));
    fights.forEach((fight) => {
      if (fight.report_code === report.code) {
        const fightDate = new Date(reportStart.getTime() + parseInt(fight.start_time, 10));
        const fightEnd = new Date(reportStart.getTime() + parseInt(fight.end_time, 10));
        const fightObj = {
          fightDate,
          fightTime: fightEnd - fightDate,
          fightPercent: parseFloat(fight.fight_percent),
          lastPhase: parseInt(fight.last_phase, 10),
          kill: fight.kill === '1.0',
        };
        fightList.push(fightObj);
      }
    });
  });
  const highestPhase = Math.max(...fightList.map((o) => o.lastPhase));
  for (let i = 1; i <= highestPhase; i++) {
    const currPhase = fightList.filter((o) => o.lastPhase === i);
    let progDate = null;
    if (i < highestPhase && currPhase.length > 0) {
      const nextPhase = fightList.filter((o) => o.lastPhase === i + 1);
      const firstNewPhase = nextPhase.reduce(
        (a, b) => (a.fightDate < b.fightDate ? a.fightDate : b.fightDate),
      );
      progDate = firstNewPhase;
    } else if (currPhase.some((e) => e.kill)) {
      const kill = currPhase.filter((e) => e.kill === true);
      progDate = kill[0].fightDate;
    } else if (currPhase.length > 0) {
      const finalFight = currPhase.reduce(
        (a, b) => (a.fightDate > b.fightDate ? a.fightDate : b.fightDate),
      );
      progDate = finalFight;
    } else {
      break;
    }
    const beforeProgList = currPhase.filter((o) => o.fightDate < progDate);
    const beforeProg = {
      phase: i,
      pulls: beforeProgList.length,
      totalPulls: currPhase.length,
      progTime: beforeProgList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.fightTime, 0,
      ),
      totalTime: currPhase.reduce(
        (accumulator, currentValue) => accumulator + currentValue.fightTime, 0,
      ),
    };
    progArr.push(beforeProg);
  }
  return progArr;
};

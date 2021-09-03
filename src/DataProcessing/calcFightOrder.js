export default (reports, fights) => {
  if (!reports || !fights) {
    return null;
  }
  const reportList = reports.map((report) => {
    const reportStart = new Date(parseInt(report.start, 10));
    const reportFightList = fights.map((fight) => {
      if (fight.report_code === report.code) {
        return {
          fightStart: new Date(reportStart.getTime() + parseInt(fight.start_time, 10)),
          fightPercent: parseFloat(fight.fight_percent),
          lastPhase: fight.intermission ? parseFloat(`${fight.last_phase}.${fight.intermission}`) : parseInt(fight.last_phase, 10),
          kill: !!+fight.kill,
          consistency: parseFloat(fight.consistency),
          code: fight.report_code,
        };
      }
      return null;
    });
    return reportFightList.filter((e) => e);
  });
  const fightList = [].concat(...reportList);
  return fightList.sort((a, b) => a.fightStart - b.fightStart);
};

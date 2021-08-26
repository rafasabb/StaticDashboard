export default (reports, fights) => {
  if (!reports || !fights) {
    return null;
  }
  const phaseList = [];
  const reportList = reports.map((report) => {
    const reportStart = new Date(parseInt(report.start, 10));
    const pullArray = fights.map((fight) => {
      if (fight.report_code === report.code) {
        const lastPhase = parseInt(fight.last_phase, 10);
        if (!phaseList.includes(lastPhase)) {
          phaseList.push(lastPhase);
        }
        return lastPhase;
      }
      return null;
    });

    const pullList = phaseList.map(
      (phase) => pullArray.reduce((n, number) => n + (number === phase), 0),
    );

    return {
      start: reportStart,
      code: report.code,
      list: pullList,
    };
  });
  return {
    phases: phaseList,
    reports: reportList,
  };
};

export default (reports, fights, deathPerFight) => {
  if (!reports || !fights || !deathPerFight) {
    return null;
  }
  const sortedReports = reports.sort((a, b) => a.start - b.start).map((element, index) => {
    const e = element;
    e.number = index;
    return e;
  });
  fights.forEach((element, index) => {
    const rep = sortedReports.find((e) => e.code === element.report_code);
    if (!rep.list) {
      rep.list = [];
    }
    const currDeaths = deathPerFight.filter((e) => parseInt(e.fight_id, 10) === index);
    rep.list.push(currDeaths);
  });
  const retObj = sortedReports.map((element) => {
    const newList = element.list.flat();
    const currentDate = new Date(parseInt(element.start, 10));
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const output = [];
    newList.forEach((obj) => {
      const exists = output.find((e) => e.name === obj.name);
      if (exists) {
        exists.total = parseInt(exists.total, 10) + parseInt(obj.total, 10);
      } else {
        output.push(obj);
      }
    });
    return {
      number: element.number,
      date,
      list: output,
    };
  });

  return retObj;
};

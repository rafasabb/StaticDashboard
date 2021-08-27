export const createColumns = (fightConstant) => {
  if (!fightConstant) {
    return null;
  }
  const columns = [];
  const date = {
    Header: 'Date',
    accessor: 'date',
  };

  columns.push(date);

  const phases = fightConstant.map((d) => ({ Header: `P${d.number}`, accessor: `p${d.number}` }));
  return columns.concat(phases);
};

export const createDataSource = (data) => {
  if (!data) {
    return null;
  }
  return data.reports.map((report) => {
    const returnObj = {};
    returnObj.date = `${report.start.getDate()}/${report.start.getMonth()}/${report.start.getFullYear()}`;
    returnObj.sDate = report.start;
    returnObj.code = report.code;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.phases.length; i++) {
      const currentNumber = data.phases[i];
      const currentCount = report.list[i] ? report.list[i] : 0;
      returnObj[`p${currentNumber}`] = currentCount;
    }
    return returnObj;
  }).sort((a, b) => b.sDate - a.sDate);
};

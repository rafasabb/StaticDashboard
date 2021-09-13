import { currentPhaseLoc } from './utils';

export const createFightColumns = (fightConstant, dateStr) => {
  if (!fightConstant) {
    return null;
  }
  let interCount = 1;
  const columns = [];
  const date = {
    Header: dateStr,
    accessor: 'date',
  };

  columns.push(date);

  const phases = fightConstant.map((d) => {
    const Header = d.intermission ? `I${interCount}` : `P${d.number}`;
    // eslint-disable-next-line no-plusplus
    const accessor = d.intermission ? `i${interCount++}` : `p${d.number}`;
    return { Header, accessor };
  });
  return columns.concat(phases);
};

export const createFightDataSource = (currentFightPhases, data) => {
  if (!data) {
    return null;
  }
  return data.reports.map((report) => {
    const returnObj = {};
    let interCount = 1;
    returnObj.date = `${report.start.getDate()}/${report.start.getMonth() + 1}/${report.start.getFullYear()}`;
    returnObj.sDate = report.start;
    returnObj.code = report.code;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.phases.length; i++) {
      const currentNumber = currentPhaseLoc(currentFightPhases, data.phases[i]);
      const { intermission } = currentFightPhases[currentNumber];

      const currentCount = report.list[i] ? report.list[i] : 0;

      // eslint-disable-next-line no-plusplus
      const accessor = intermission ? `i${interCount++}` : `p${data.phases[i]}`;
      returnObj[accessor] = currentCount;
    }
    return returnObj;
  }).sort((a, b) => b.sDate - a.sDate);
};

export const createDeathColumns = (nameStr) => {
  const columns = [];
  const date = {
    Header: nameStr,
    accessor: 'name',
  };
  const total = {
    Header: 'Total',
    accessor: 'total',
  };
  columns.push(date);
  columns.push(total);
  return columns;
};

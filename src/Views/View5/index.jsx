/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Table } from 'antd';
import './view5.css';

export default (props) => {
  const { data } = props;

  const setColor = (consistency) => {
    if (consistency <= 0.39) {
      return 'red';
    }
    if (consistency >= 0.4 && consistency <= 0.69) {
      return '#FFC857';
    }
    return 'blue';
  };

  const phases = {
    1: 'Garuda',
    2: 'Ifrit',
    3: 'Titan',
    4: 'Lahabrea',
    5: 'Ultima',
  };

  const createDataSource = () => {
    if (data) {
      return data.reports.map((report, index) => {
        const returnObj = {};
        returnObj.date = `${report.start.getDate()}/${report.start.getMonth()}/${report.start.getFullYear()}`;
        returnObj.sDate = report.start;
        returnObj.key = index;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.phases.length; i++) {
          const currentNumber = data.phases[i];
          const currentCount = report.list[i] ? report.list[i] : 0;
          returnObj[currentNumber] = currentCount;
        }
        return returnObj;
      }).sort((a, b) => b.sDate - a.sDate);
    }
    return null;
  };

  const createColumns = () => {
    if (data) {
      const columns = [];
      const sortedPhases = data.phases.sort();
      const date = {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      };
      columns.push(date);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortedPhases.length; i++) {
        const phaseObj = {
          title: phases[i + 1],
          dataIndex: sortedPhases[i],
          key: sortedPhases[i],
        };
        columns.push(phaseObj);
      }
      return columns;
    }
    return null;
  };
  return (
    <Row id="view3">
      <Table dataSource={createDataSource()} columns={createColumns()} />
    </Row>
  );
};

/* eslint-disable react/prop-types */
import React from 'react';
import { Row } from 'antd';
import './view6.css';

import ScatterPlot from '../../Charts/ScatterPlot';

export default (props) => {
  const { data } = props;

  const dud = [
    {
      fightStart: new Date(0),
      fightPercent: 25.0,
      lastPhase: 1,
      kill: false,
      consistency: 0.82,
    },
    {
      fightStart: new Date(8.64e+7),
      fightPercent: 50.0,
      lastPhase: 2,
      kill: false,
      consistency: 0.64,
    },
    {
      fightStart: new Date(1.728e+8),
      fightPercent: 75.0,
      lastPhase: 3,
      kill: false,
      consistency: 0.23,
    },
  ];

  return (
    <Row id="view3">
      <ScatterPlot dataset={data || dud} setPhase="a" selection={1} width={800} height={300} />
    </Row>
  );
};

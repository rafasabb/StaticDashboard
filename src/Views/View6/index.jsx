/* eslint-disable react/prop-types */
import React from 'react';
import { Row } from 'antd';
import './view6.css';

import ScatterPlot from '../../Charts/ScatterPlot';

export default (props) => {
  const {
    data,
    currentPhase,
    currentReport,
    setCurrentPhase,
  } = props;

  return (
    <Row id="view6">
      <ScatterPlot
        dataset={data}
        currentPhase={currentPhase}
        setCurrentPhase={setCurrentPhase}
        currentReport={currentReport}
        width={600}
        height={300}
      />
    </Row>
  );
};

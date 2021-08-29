/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { Row } from 'antd';
import './view6.css';

import ScatterPlot from '../../Charts/ScatterPlot';

export default (props) => {
  const {
    data,
    currentPhase,
    currentReport,
    setCurrentPhase,
    currentFightPhases,
  } = props;
  const [dimensions, setDimensions] = useState([100, 100]); // [width, height]

  const divRef = useRef(null);
  useEffect(() => {
    setDimensions([divRef.current.scrollWidth, divRef.current.scrollHeight]);
  }, []);

  return (
    <Row id="view">
      <div className="width_max" ref={divRef}>
        <ScatterPlot
          dataset={data}
          currentPhase={currentPhase}
          setCurrentPhase={setCurrentPhase}
          currentReport={currentReport}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
        />
      </div>
    </Row>
  );
};

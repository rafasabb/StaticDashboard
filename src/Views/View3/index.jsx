/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import {
  Statistic, Row, Col, Radio,
} from 'antd';
import BarChart from '../../Charts/BarChart';
import './view3.css';

import { msToTime } from '../../Utils/utils';

export default (props) => {
  const {
    data, currentFightPhases, currentPhase, setCurrentPhase,
  } = props;
  const [currentSelection, setCurrentSelection] = useState('a');
  const [dimensions, setDimensions] = useState([100, 100]); // [width, height]

  const divRef = useRef(null);
  const setSelected = (s) => setCurrentSelection(s.target.value);

  // TODO consertar resize
  useEffect(() => {
    setDimensions([divRef.current.scrollWidth, divRef.current.scrollHeight]);
  }, []);

  return (
    <Row id="view">
      <Col span={4}>
        <Radio.Group defaultValue="a" size="small" buttonStyle="solid" onChange={setSelected}>
          <Radio.Button value="a">P</Radio.Button>
          <Radio.Button value="b">T</Radio.Button>
        </Radio.Group>
        <Row className="title_row">
          <Statistic
            // eslint-disable-next-line no-nested-ternary
            title={(currentPhase)
              ? data[currentPhase - 1].name
              : (currentSelection === 'a')
                ? 'Pulls'
                : 'Hours'}
            // eslint-disable-next-line no-nested-ternary
            value={(currentPhase)
              ? (currentSelection === 'a'
                ? data[currentPhase - 1].wipesBeforeProg
                : msToTime(data[currentPhase - 1].progTime))
              : (currentSelection === 'a'
                ? data.reduce((n, d) => n + d.wipesPerPhase, 0)
                : msToTime(data.reduce((n, d) => n + d.progTime, 0))
              )}
            valueStyle={{ color: (currentPhase) ? data[currentPhase - 1].color : '#000' }}
          />
        </Row>
        <Row className="title_row small_title">
          { (currentPhase)
            ? <Statistic title="Wipes" value={currentSelection === 'a' ? data[currentPhase - 1].wipesPerPhase : msToTime(data[currentPhase - 1].totalTime)} valueStyle={{ color: data[currentPhase - 1].color }} />
            : <></> }
        </Row>
      </Col>
      <Col className="max" span={20}>
        <div className="max" ref={divRef}>
          <BarChart
            dataset={data}
            selection={currentSelection}
            currentPhase={currentPhase}
            setPhase={setCurrentPhase}
            currentFightPhases={currentFightPhases}
            dimensions={dimensions}
          />
        </div>
      </Col>
    </Row>
  );
};

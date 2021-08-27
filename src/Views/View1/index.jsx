/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { Statistic, Row, Col } from 'antd';
import { formatHour } from '../../Utils/utils';
import PieChart from '../../Charts/PieChart';
import './view1.css';

export default (props) => {
  const { data } = props;
  const [dimensions, setDimensions] = useState([100, 100]); // [width, height]

  const divRef = useRef(null);

  // TODO consertar resize
  useEffect(() => {
    setDimensions([divRef.current.scrollWidth, divRef.current.scrollHeight]);
  }, []);

  return (
    <Row id="view">
      <Col span={12}>
        <Row className="title_row">
          <Statistic title="Horas de Prog" value={data ? formatHour(data.totalProgressionHours) : '00:00'} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Horas Combate" value={data ? formatHour(data.totalTimeInCombat) : '00:00'} valueStyle={{ color: 'steelblue' }} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Horas Ocioso" value={data ? formatHour(data.totalIdleTime) : '00:00'} valueStyle={{ color: 'LightBlue' }} />
        </Row>
      </Col>
      <Col className="max" span={12}>
        <div className="max center" ref={divRef}>
          <PieChart
            data={[data.totalTimeInCombat, data.totalIdleTime]}
            dimensions={dimensions}
          />
        </div>
      </Col>
    </Row>
  );
};

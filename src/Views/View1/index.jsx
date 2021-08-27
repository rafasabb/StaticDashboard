/* eslint-disable react/prop-types */
import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { formatHour } from '../../Utils/utils';
import PieChart from '../../Charts/PieChart';
import './view1.css';

export default (props) => {
  const { data } = props;
  const width = 160; // TODO
  const height = 160; // TODO

  return (
    <Row id="view1">
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
      <Col span={12}>
        <PieChart
          data={[data.totalTimeInCombat, data.totalIdleTime]}
          width={width}
          height={height}
        />
      </Col>
    </Row>
  );
};

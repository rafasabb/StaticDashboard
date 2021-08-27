/* eslint-disable react/prop-types */
import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { formatHour } from '../../Utils/utils';
import './view2.css';

export default (props) => {
  const { data } = props;

  return (
    <Row id="view2">
      <Col span={12}>
        <Row className="title_row">
          <Statistic title="Semanas de prog" value={data.weeksOfProgression} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Dias de Raid" value={data.totalRaidDays} valueStyle={{ color: 'steelblue' }} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Dias Corridos" value={data.totalDaysToClear} valueStyle={{ color: 'steelblue' }} />
        </Row>
      </Col>
      <Col span={12}>
        <Row span={24} className="title_row right_text">
          <Statistic title="Horas p/semana" value={formatHour(data.averageHoursPerWeek)} />
        </Row>
        <Row span={24} className="title_row small_title right_text">
          <Statistic title="Horas p/dia" value={formatHour(data.averageHoursPerDay)} valueStyle={{ color: 'steelblue' }} />
        </Row>
        <Row span={24} className="title_row small_title right_text">
          <Statistic title="Dias p/semana" value={data.averageDaysPerWeek.toFixed(2)} valueStyle={{ color: 'steelblue' }} />
        </Row>
      </Col>
    </Row>
  );
};

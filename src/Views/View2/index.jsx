/* eslint-disable react/prop-types */
import React from 'react';
import { Statistic, Row, Col } from 'antd';
import './view2.css';

export default (props) => {
  const { data } = props;

  const formatHour = (time) => {
    const pad = (n, z = 2) => (`00${n}`).slice(-z);

    return `${pad(time.hours)}:${pad(time.minutes)}`;
  };

  return (
    <Row id="view2">
      <Col span={12}>
        <Row className="title_row">
          <Statistic title="Semanas de prog" value={data ? data.weeksOfProgression : 0} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Dias de Raid" value={data ? data.totalRaidDays : 0} valueStyle={{ color: 'steelblue' }} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Dias Corridos" value={data ? data.totalDaysToClear : 0} valueStyle={{ color: 'steelblue' }} />
        </Row>
      </Col>
      <Col span={12}>
        <Row span={24} className="title_row right_text">
          <Statistic title="Horas p/semana" value={data ? formatHour(data.averageHoursPerWeek) : '00:00'} />
        </Row>
        <Row span={24} className="title_row small_title right_text">
          <Statistic title="Horas p/dia" value={data ? formatHour(data.averageHoursPerDay) : '00:00'} valueStyle={{ color: 'steelblue' }} />
        </Row>
        <Row span={24} className="title_row small_title right_text">
          <Statistic title="Dias p/semana" value={data ? data.averageDaysPerWeek.toFixed(2) : '00:00'} valueStyle={{ color: 'steelblue' }} />
        </Row>
      </Col>
    </Row>
  );
};

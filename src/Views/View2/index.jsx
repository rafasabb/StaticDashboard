/* eslint-disable react/prop-types */
import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { formatHour } from '../../Utils/utils';
import './view2.css';

export default (props) => {
  const { data } = props;

  return (
    <Row id="view">
      <Col span={12}>
        <Row className="title_row width_max">
          <Statistic className="width_max" title="Semanas de prog" value={data.weeksOfProgression} />
        </Row>
        <Row className="title_row small_title width_max">
          <Statistic className="width_max" title="Dias de Raid" value={data.totalRaidDays} valueStyle={{ color: 'steelblue' }} />
        </Row>
        <Row className="title_row small_title width_max">
          <Statistic className="width_max" title="Dias Corridos" value={data.totalDaysToClear} valueStyle={{ color: 'steelblue' }} />
        </Row>
      </Col>
      <Col span={12}>
        <Row span={24} className="title_row right_text width_max">
          <Statistic className="width_max" title="Horas p/semana" value={formatHour(data.averageHoursPerWeek)} />
        </Row>
        <Row span={24} className="title_row small_title right_text width_max">
          <Statistic className="width_max" title="Horas p/dia" value={formatHour(data.averageHoursPerDay)} valueStyle={{ color: 'steelblue' }} />
        </Row>
        <Row span={24} className="title_row small_title right_text width_max">
          <Statistic className="width_max" title="Dias p/semana" value={data.averageDaysPerWeek.toFixed(2)} valueStyle={{ color: 'steelblue' }} />
        </Row>
      </Col>
    </Row>
  );
};

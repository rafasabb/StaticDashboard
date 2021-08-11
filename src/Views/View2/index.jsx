import React from 'react';
import { Statistic, Row, Col } from 'antd';
import './view2.css';

export default () => (
  <Row id="view2">
    <Col span={12}>
      <Row className="title_row">
        <Statistic title="Semanas de prog" value="14" />
      </Row>
      <Row className="title_row small_title">
        <Statistic title="Dias de Raid" value="31" valueStyle={{ color: 'steelblue' }} />
      </Row>
      <Row className="title_row small_title">
        <Statistic title="Dias Corridos" value="96" valueStyle={{ color: 'steelblue' }} />
      </Row>
    </Col>
    <Col span={12}>
      <Row className="title_row right_text">
        <Statistic title="Horas p/semana" value="3:56" />
      </Row>
      <Row className="title_row small_title right_text">
        <Statistic title="Horas p/dia" value="1:45" valueStyle={{ color: 'steelblue' }} />
      </Row>
      <Row className="title_row small_title right_text">
        <Statistic title="Dias p/semana" value="1.96" valueStyle={{ color: 'steelblue' }} />
      </Row>
    </Col>
  </Row>
);

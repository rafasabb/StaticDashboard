import React from 'react';
import {
  Statistic, Row, Col, Radio,
} from 'antd';
import BarChart from '../../Charts/BarChart';
import './view3.css';

export default () => {
  const data = [];
  const width = 300;
  const height = 160;
  return (
    <Row id="view3">
      <Col span={4}>
        <Radio.Group defaultValue="a" size="small" buttonStyle="solid">
          <Radio.Button value="a">P</Radio.Button>
          <Radio.Button value="b">T</Radio.Button>
        </Radio.Group>
        <Row className="title_row">
          <Statistic title="Garuda" value="13" valueStyle={{ color: '#90BE6D' }} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Wipes" value="29" valueStyle={{ color: '#90BE6D' }} />
        </Row>
      </Col>
      <Col span={12}>
        <BarChart data={data} width={width} height={height} />
      </Col>
    </Row>
  );
};

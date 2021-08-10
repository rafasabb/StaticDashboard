import React from 'react';
import { Statistic, Row, Col } from 'antd';
import PieChart from '../../Charts/PieChart';
import './view1.css';

export const View1 = () => {  
  const data = []
  const width = 160;
  const height = 160;

  return (
    <Row id='view1'>
      <Col span={12} >
        <Row className="title_row">
          <Statistic title="Horas de Prog" value={'51:32'} />
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Horas Combate" value={'31:32'} valueStyle={{color:"steelblue"}}/>
        </Row>
        <Row className="title_row small_title">
          <Statistic title="Horas Ocioso" value={'11:32'} valueStyle={{color:"LightBlue"}}/>
        </Row>
      </Col>
      <Col span={12} >
        <PieChart data={data} width={width} height={height} />
      </Col>
    </Row>
  )
}
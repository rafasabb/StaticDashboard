import React, { useState, useEffect } from 'react';

import {
  Layout, Menu, Row, Col,
} from 'antd';
import 'antd/dist/antd.css';
import './dashboard.css';

import { csv } from 'd3';

import View1 from './Views/View1';
import View2 from './Views/View2';
import View3 from './Views/View3';
import View4 from './Views/View4';

import calcTime from './DataProcessing/calcTime';
import calcConsistency from './DataProcessing/calcConsistency';
import calcProgressionPerPhase from './DataProcessing/calcProgressionPerPhase';

const {
  Header, Content, Footer,
} = Layout;

const fightCsvUrL = 'https://gist.githubusercontent.com/rafasabb/39a35148e96e144c60d0679eb155321c/raw/dab5fb81e935bd46b5a0ca1bd4c7c953529d0529/fights.csv';
const reportCsvUrl = 'https://gist.githubusercontent.com/rafasabb/39a35148e96e144c60d0679eb155321c/raw/dab5fb81e935bd46b5a0ca1bd4c7c953529d0529/reports.csv';
function chooseFight(current) {
  switch (current) {
    case 0:
      return [fightCsvUrL, reportCsvUrl];
    default:
      return [null, null];
  }
}

export default () => {
  const [currentFight, setCurrentFight] = useState(0);
  const [fightData, setFightData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [processedConsistency, setProcessedConsistency] = useState(null);
  const [progressionPerPhase, setProgressionPerPhase] = useState(null);

  const loadCSV = (fightArray) => {
    csv(fightArray[0]).then((data) => {
      setFightData(data);
    });
    csv(fightArray[1]).then((data) => {
      setReportData(data);
    });
  };

  const setFight = (prop) => {
    setCurrentFight(prop.key);
  };

  useEffect(() => {
    loadCSV(chooseFight(currentFight));
  }, [currentFight]);

  useEffect(() => {
    if (fightData && reportData) {
      setProcessedData(calcTime(reportData, fightData));
      setProcessedConsistency(calcConsistency(reportData));
      setProgressionPerPhase(calcProgressionPerPhase(reportData, fightData));
    }
  }, [fightData, reportData]);
  return (
    <>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} onSelect={setFight}>
          <Menu.Item key="0">UWU</Menu.Item>
          <Menu.Item key="1">UCOB</Menu.Item>
          <Menu.Item key="2">TEA</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout className="site-layout-background layout_background" style={{ height: 800, padding: '24px 0' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={5}>
              <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
                <View1 data={processedData} />
              </Content>
            </Col>

            <Col xs={24} sm={12} md={12} lg={5} xl={4}>
              <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
                <View2 data={processedData} />
              </Content>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={7}>
              <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
                <View3 data={progressionPerPhase} current={currentFight} />
              </Content>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={5}>
              <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
                <View4 data={processedConsistency} />
              </Content>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Content className="pane" style={{ height: 600, marginBottom: '10px' }} />
            </Col>
            <Col span={12}>
              <Content className="pane" style={{ height: 600, marginBottom: '10px' }} />
            </Col>
          </Row>
        </Layout>
      </Content>
      <Footer style={{ height: 20 }}>
        {/* <div style={{ marginTop: -10 }}>
          Source Code
          {' '}
          <a href="https://github.com/sdq/react-d3-dashboard">https://github.com/sdq/react-d3-dashboard</a>
          ;
          Author
          {' '}
          <a href="https://sdq.ai">sdq</a>
          ;
        </div> */}
      </Footer>
    </>
  );
};

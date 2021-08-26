import React, { useState, useEffect, useMemo } from 'react';

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
import View5 from './Views/View5';
import View6 from './Views/View6';

import { UWU } from './Constants/fightConstants';

import { createColumns, createDataSource } from './Utils/tableUtils';

import calcTime from './DataProcessing/calcTime';
import calcConsistency from './DataProcessing/calcConsistency';
import calcProgressionPerPhase from './DataProcessing/calcProgressionPerPhase';
import calcPhaseProg from './DataProcessing/calcPhaseProg';
import calcFightOrder from './DataProcessing/calcFightOrder';

const {
  Header, Content,
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
  // Selection
  const [currentFight, setCurrentFight] = useState(0); // Uwu, Ucob, Tea, etc..
  const [currentPhase, setCurrentPhase] = useState(null); // 1, 2, 3..
  const [currentReport, setCurrentReport] = useState(null); // report code

  // Base data
  const [fightData, setFightData] = useState(null);
  const [reportData, setReportData] = useState(null);

  // Processed data
  const processedData = useMemo(() => calcTime(reportData, fightData), [fightData, reportData]);
  const processedConsistency = useMemo(() => calcConsistency(reportData), [reportData]);
  const progressionPerPhase = useMemo(
    () => calcProgressionPerPhase(reportData, fightData), [fightData, reportData],
  );
  const progressionTotal = useMemo(
    () => calcPhaseProg(reportData, fightData), [fightData, reportData],
  );
  const fightOrder = useMemo(() => calcFightOrder(reportData, fightData), [fightData, reportData]);
  const tableColumns = useMemo(() => createColumns(UWU), []);
  const tableData = useMemo(() => createDataSource(progressionTotal), [progressionTotal]);

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
                <View3
                  data={progressionPerPhase}
                  current={currentFight}
                  selectedPhase={currentPhase}
                  setSelectedPhase={setCurrentPhase}
                />
              </Content>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={5}>
              <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
                <View4 data={processedConsistency} />
              </Content>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={9}>
              <Content className="pane" style={{ height: 600, marginBottom: '10px' }}>
                {
                  (tableColumns && tableData)
                    ? (
                      <View5
                        tableColumns={tableColumns}
                        tableData={tableData}
                        setCurrentReport={setCurrentReport}
                        currentReport={currentReport}
                      />
                    )
                    : <></>
                }
              </Content>
            </Col>
            <Col span={12}>
              <Content className="pane" style={{ height: 600, marginBottom: '10px' }}>
                <View6
                  data={fightOrder}
                  currentPhase={currentPhase}
                  currentReport={currentReport}
                  setCurrentPhase={setCurrentPhase}
                />
              </Content>
            </Col>
          </Row>
        </Layout>
      </Content>
    </>
  );
};

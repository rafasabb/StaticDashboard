import React from 'react';
import {
  Layout, Menu, Row, Col,
} from 'antd';
import 'antd/dist/antd.css';
import './dashboard.css';
import View1 from './Views/View1';
import View2 from './Views/View2';
import View3 from './Views/View3';
import View4 from './Views/View4';

const {
  Header, Content, Footer,
} = Layout;

export default () => (
  <>
    <Header className="header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">UWU</Menu.Item>
        <Menu.Item key="2">UCOB</Menu.Item>
        <Menu.Item key="3">TEA</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Layout className="site-layout-background layout_background" style={{ height: 800, padding: '24px 0' }}>
        <Row gutter={16}>
          <Col span={4}>
            <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
              <View1 />
            </Content>
          </Col>

          <Col span={4}>
            <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
              <View2 />
            </Content>
          </Col>

          <Col span={5}>
            <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
              <View3 />
            </Content>
          </Col>

          <Col span={3}>
            <Content className="pane" style={{ height: 160, marginBottom: '10px' }}>
              <View4 />
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
      <div style={{ marginTop: -10 }}>
        Source Code
        {' '}
        <a href="https://github.com/sdq/react-d3-dashboard">https://github.com/sdq/react-d3-dashboard</a>
        ;
        Author
        {' '}
        <a href="https://sdq.ai">sdq</a>
        ;
      </div>
    </Footer>
  </>
);

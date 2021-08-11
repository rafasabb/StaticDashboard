import React from 'react';
import {
  Statistic, Row, List,
} from 'antd';
import './view4.css';

const classNames = require('classnames');

export default () => {
  const data = [
    {
      day: '22/03/1990',
      consistency: '0.72',
    },
    {
      day: '11/05/2012',
      consistency: '0.12',
    },
    {
      day: '08/06/2152',
      consistency: '0.47',
    },
  ];

  return (
    <Row id="view3">
      <Row className="margin_bot">
        <Statistic className="title_row" title="Consistencia Media" value="44%" valueStyle={{ color: '#FFC857' }} />
      </Row>
      <Row>
        <text className="title_row ant-statistic-title">
          Consistencia nos ultimos dias
        </text>
      </Row>
      <Row className="width_max">
        <List
          className="width_max"
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              style={{ paddingTop: '2px', paddingBottom: '2px' }}
            >
              <div className="spread_ends width_max">
                <div className="inline">
                  {item.day.toString()}
                </div>
                <div className={
                    classNames(
                      { color_bad: item.consistency <= 0.39 },
                      { color_warning: item.consistency >= 0.40 && item.consistency <= 0.69 },
                      { color_good: item.consistency >= 0.70 },
                    )
}
                >
                  {`${parseFloat(item.consistency) * 100}%`}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Row>
    </Row>
  );
};

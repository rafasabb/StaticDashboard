/* eslint-disable react/prop-types */
import React from 'react';
import {
  Statistic, Row, List,
} from 'antd';
import './view4.css';

const classNames = require('classnames');

export default (props) => {
  const { data } = props;

  const dud = [
    {
      start: new Date(0),
      consistency: 0.0,
    },
    {
      start: new Date(8.64e+7),
      consistency: 0.5,
    },
    {
      start: new Date(1.728e+8),
      consistency: 0.99,
    },
  ];

  const setColor = (consistency) => {
    if (consistency <= 0.39) {
      return 'red';
    }
    if (consistency >= 0.40 && consistency <= 0.69) {
      return '#FFC857';
    }
    return 'blue';
  };
  return (
    <Row id="view3">
      <Row className="margin_bot">
        <Statistic
          className="title_row"
          title="Consistencia Media"
          value={data ? `${(data.medianConsistency.toFixed(2) * 100.0).toFixed(0)}%` : '0%'}
          valueStyle={{
            // eslint-disable-next-line no-nested-ternary
            color: data ? setColor(data.medianConsistency) : setColor(0.00),
          }}
        />
      </Row>
      <Row className="width_max">
        <p className="title_row ant-statistic-title">
          Consistencia nos ultimos dias
        </p>
      </Row>
      <Row className="width_max">
        <List
          className="width_max"
          size="small"
          dataSource={data ? data.lastFights : dud}
          renderItem={(item) => (
            <List.Item
              style={{ paddingTop: '2px', paddingBottom: '2px' }}
            >
              <div className="spread_ends width_max">
                <div className="inline">
                  {`${item.start.getDate()}/${item.start.getMonth()}/${item.start.getFullYear()}`}
                </div>
                <div className={
                    classNames(
                      { color_bad: item.consistency <= 0.39 },
                      { color_warning: item.consistency >= 0.40 && item.consistency <= 0.69 },
                      { color_good: item.consistency >= 0.70 },
                    )
}
                >
                  {`${(item.consistency.toFixed(2) * 100.0).toFixed(0)}%`}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Row>
    </Row>
  );
};
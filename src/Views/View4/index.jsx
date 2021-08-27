/* eslint-disable react/prop-types */
import React from 'react';
import {
  Statistic, Row, List,
} from 'antd';
import './view4.css';

import { consistencyColor } from '../../Utils/utils';

const classNames = require('classnames');

export default (props) => {
  const { data } = props;

  return (
    <Row id="view">
      <Row className="margin_bot">
        <Statistic
          className="title_row"
          title="Consistencia Media"
          value={`${(100 - data.medianConsistency.toFixed(2) * 100.0).toFixed(0)}%`}
          valueStyle={{
            // eslint-disable-next-line no-nested-ternary
            color: consistencyColor(1 - data.medianConsistency),
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
          dataSource={data.lastFights}
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
                      { color_bad: 1.0 - item.consistency <= 0.39 },
                      {
                        color_warning: 1.0 - item.consistency >= 0.40
                        && 1.0 - item.consistency <= 0.59,
                      },
                      { color_good: 1.0 - item.consistency >= 0.60 },
                    )
}
                >
                  {`${(100 - item.consistency.toFixed(2) * 100.0).toFixed(0)}%`}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Row>
    </Row>
  );
};

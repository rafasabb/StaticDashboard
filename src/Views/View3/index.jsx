/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Statistic, Row, Col, Radio,
} from 'antd';
import BarChart from '../../Charts/BarChart';
import './view3.css';

import { msToTime } from '../../Utils/utils';

export default (props) => {
  const {
    data, current, selectedPhase, setSelectedPhase,
  } = props;
  const [currentSelection, setCurrentSelection] = useState('a');

  // TODO
  const width = 295;
  const height = 155;

  const setSelected = (s) => setCurrentSelection(s.target.value);

  // TODO - Mover a logica para outro lugar
  const createDataset = (fightData, fightProps) => {
    const arr = [];
    fightProps.forEach((p) => {
      const currentF = fightData.filter((o) => o.phase === p.number)[0];
      const item = {
        label: p.name,
        number: p.number,
        pulls: currentF.pulls,
        color: p.color,
        totalPulls: currentF.totalPulls,
        progTime: currentF.progTime,
        totalTime: currentF.totalTime,
      };
      arr.push(item);
    });
    return arr;
  };

  const calcProg = (dataset) => ({
    totalPulls: dataset.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalPulls, 0,
    ),
    totalTime: dataset.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalTime, 0,
    ),
  });

  const currentSelect = (dataset) => {
    if (!selectedPhase) {
      return null;
    }
    const currentF = dataset.filter((o) => o.number === selectedPhase)[0];
    return {
      label: currentF.label,
      pulls: currentF.pulls,
      color: currentF.color,
      totalPulls: currentF.totalPulls,
      progTime: currentF.progTime,
      totalTime: currentF.totalTime,
    };
  };
  const dataset = createDataset(data, current);
  const currentSelectedFight = currentSelect(dataset);
  const prog = calcProg(dataset);
  return (
    <Row id="view3">
      <Col span={4}>
        <Radio.Group defaultValue="a" size="small" buttonStyle="solid" onChange={setSelected}>
          <Radio.Button value="a">P</Radio.Button>
          <Radio.Button value="b">T</Radio.Button>
        </Radio.Group>
        <Row className="title_row">
          <Statistic
            title={(selectedPhase && currentSelectedFight) ? currentSelectedFight.label : 'Pulls'}
            // eslint-disable-next-line no-nested-ternary
            value={(selectedPhase && currentSelectedFight) ? (currentSelection === 'a' ? currentSelectedFight.pulls : msToTime(currentSelectedFight.progTime)) : (currentSelection === 'a' ? prog.totalPulls : msToTime(prog.totalTime))}
            valueStyle={{ color: (selectedPhase && currentSelectedFight) ? currentSelectedFight.color : '#000' }}
          />
        </Row>
        <Row className="title_row small_title">
          {(selectedPhase && currentSelectedFight) ? <Statistic title="Wipes" value={currentSelectedFight.totalPulls} valueStyle={{ color: currentSelectedFight.color }} /> : <></>}
        </Row>
      </Col>
      <Col span={12}>
        <BarChart
          dataset={dataset}
          selection={currentSelection}
          currentPhase={selectedPhase}
          setPhase={setSelectedPhase}
          width={width}
          height={height}
        />
      </Col>
    </Row>
  );
};

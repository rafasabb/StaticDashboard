/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Statistic, Row, Col, Radio,
} from 'antd';
import BarChart from '../../Charts/BarChart';
import './view3.css';

import { UWU } from '../../Constants/fightConstants';

export default (props) => {
  const { data, current } = props;
  const [currentSelection, setCurrentSelection] = useState('a');
  const [selectedPhase, setSelectedPhase] = useState(null);
  const width = 295;
  const height = 155;

  const setSelected = (select) => {
    setCurrentSelection(select.target.value);
  };

  const dud = [
    {
      label: 'C', pulls: 72, color: '#000', totalPulls: 0, progTime: 100, totalTime: 210,
    },
    {
      label: 'A', pulls: 12, color: '#000', totalPulls: 0, progTime: 100, totalTime: 210,
    },
    {
      label: 'B', pulls: 32, color: '#000', totalPulls: 0, progTime: 100, totalTime: 210,
    },
  ];

  const msToTime = (duration) => {
    // const milliseconds = Math.floor((duration % 1000) / 100);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)));
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  const createDataset = (fightData, fightProps) => {
    const arr = [];
    fightProps.forEach((p) => {
      const currentF = fightData.filter((o) => o.phase === p.number)[0];
      const item = {
        label: p.name,
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

  const currentFight = (fightData, currentF) => {
    if (!fightData) {
      return dud;
    }
    switch (currentF) {
      case 0:
        return createDataset(fightData, UWU);
      default:
        return dud;
    }
  };

  const currentSelect = (dataset) => {
    if (!selectedPhase) {
      return null;
    }
    const currentF = dataset.filter((o) => o.label === selectedPhase)[0];
    return {
      label: currentF.label,
      pulls: currentF.pulls,
      color: currentF.color,
      totalPulls: currentF.totalPulls,
      progTime: currentF.progTime,
      totalTime: currentF.totalTime,
    };
  };

  const dataset = currentFight(data, current);
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
            title={selectedPhase ? currentSelectedFight.label : 'Pulls'}
            // eslint-disable-next-line no-nested-ternary
            value={selectedPhase ? (currentSelection === 'a' ? currentSelectedFight.pulls : msToTime(currentSelectedFight.progTime)) : (currentSelection === 'a' ? prog.totalPulls : msToTime(prog.totalTime))}
            valueStyle={{ color: selectedPhase ? currentSelectedFight.color : '#000' }}
          />
        </Row>
        <Row className="title_row small_title">
          {selectedPhase ? <Statistic title="Wipes" value={currentSelectedFight.totalPulls} valueStyle={{ color: currentSelectedFight.color }} /> : <></>}
        </Row>
      </Col>
      <Col span={12}>
        <BarChart
          dataset={dataset}
          selection={currentSelection}
          setPhase={setSelectedPhase}
          width={width}
          height={height}
        />
      </Col>
    </Row>
  );
};

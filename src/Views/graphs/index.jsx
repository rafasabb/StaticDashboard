/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import GraphCard from '../graphcard';

import { calculateCurrentDeathSelection } from '../../Utils/utils';

import ScatterPlot from '../../Charts/ScatterPlot';
import BarChart from '../../Charts/BarChart';
import Table from '../../Charts/Table';
import Image from '../image';

export default (props) => {
  const {
    language,
    clearImg,
    fightOrder,
    progressionPerPhase,
    currentFightPhases,
    fightTableColumns,
    fightTableData,
    deathsTableColumns,
    deathsDay,
  } = props;
  const [dimensions, setDimensions] = useState([100, 100]);
  const [range, setRange] = useState([0, deathsDay.length - 1]);
  const [deathSelection, setDeathSelection] = useState([]);

  useEffect(() => {
    setDeathSelection(calculateCurrentDeathSelection(range, deathsDay));
  }, [range, deathsDay]);

  useEffect(() => {
    setDeathSelection(calculateCurrentDeathSelection(range, deathsDay));
  }, []);

  return (
    <div className="flex flex-row flex-wrap flex-grow mt-2">
      <GraphCard
        name={language.photo}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud
      >
        {
          (clearImg)
            ? (
              <Image
                name="clear"
                dimensions={dimensions}
                clearImg={clearImg}
              />
            )
            : <></>
        }
      </GraphCard>
      <GraphCard
        name={language.scatter}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud
      >
        <ScatterPlot
          dataset={fightOrder}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
        />
      </GraphCard>
      <GraphCard
        name={language.table1}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud={false}
      >
        <Table
          language={language}
          tableColumns={deathsTableColumns}
          tableData={deathSelection}
          pgSize={7}
          pagination={false}
          range
          defaultRange={[0, deathsDay.length - 1]}
          setRange={setRange}
          deathsDay={deathsDay}
        />
      </GraphCard>
      <GraphCard
        name={language.table2}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud={false}
      >
        <Table
          language={language}
          tableColumns={fightTableColumns}
          tableData={fightTableData}
          pgSize={7}
          pagination
          range={false}
        />
      </GraphCard>
      <GraphCard
        name={language.wipesBeforeProg}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud={false}
      >
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="wipesBeforeProg"
          tick={1}
        />
      </GraphCard>
      <GraphCard
        name={language.wipesTotal}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud={false}
      >
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="wipesPerPhase"
          tick={1}
        />
      </GraphCard>
      <GraphCard
        name={language.progTimePerPhase}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud={false}
      >
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="progTime"
          tick={2.77778e-7}
        />
      </GraphCard>
      <GraphCard
        name={language.totalTimePerPhase}
        dimensions={dimensions}
        setDimensions={setDimensions}
        dud={false}
      >
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="totalTime"
          tick={2.77778e-7}
        />
      </GraphCard>
    </div>
  );
};

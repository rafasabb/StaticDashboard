/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import GraphCard from '../graphcard';

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
    deathsTableData,
  } = props;
  const [dimensions, setDimensions] = useState([100, 100]);
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
          tableData={deathsTableData}
          pgSize={8}
          pagination={false}
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

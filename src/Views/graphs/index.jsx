/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import GraphCard from '../graphcard';

import ScatterPlot from '../../Charts/ScatterPlot';
import BarChart from '../../Charts/BarChart';
import Table from '../../Charts/Table';

export default (props) => {
  const {
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
      <GraphCard name="Pull total" dimensions={dimensions} setDimensions={setDimensions} dud>
        <ScatterPlot
          dataset={fightOrder}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
        />
      </GraphCard>
      <GraphCard name="Mortes por mecanica" dimensions={dimensions} setDimensions={setDimensions} dud={false}>
        <Table
          tableColumns={deathsTableColumns}
          tableData={deathsTableData}
          pgSize={8}
          pagination={false}
        />
      </GraphCard>
      <GraphCard name="Relação dos Dias" dimensions={dimensions} setDimensions={setDimensions} dud={false}>
        <Table
          tableColumns={fightTableColumns}
          tableData={fightTableData}
          pgSize={7}
          pagination
        />
      </GraphCard>
      <GraphCard name="Wipes antes da prog" dimensions={dimensions} setDimensions={setDimensions} dud={false}>
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="wipesBeforeProg"
          tick={1}
        />
      </GraphCard>
      <GraphCard name="Wipes Total" dimensions={dimensions} setDimensions={setDimensions} dud={false}>
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="wipesPerPhase"
          tick={1}
        />
      </GraphCard>
      <GraphCard name="Tempo antes da prog" dimensions={dimensions} setDimensions={setDimensions} dud={false}>
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="progTime"
          tick={2.77778e-7}
        />
      </GraphCard>
      <GraphCard name="Tempo Total" dimensions={dimensions} setDimensions={setDimensions} dud={false}>
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

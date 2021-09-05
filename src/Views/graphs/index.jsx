/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Graphcard from '../graphcard';

import ScatterPlot from '../../Charts/ScatterPlot';
import BarChart from '../../Charts/BarChart';
import Table from '../../Charts/Table';

export default (props) => {
  const {
    fightOrder, progressionPerPhase, currentFightPhases, tableColumns, tableData,
  } = props;
  const [dimensions, setDimensions] = useState([100, 100]);
  return (
    <div className="flex flex-row flex-wrap flex-grow mt-2">
      <Graphcard name="Pull total" setDimensions={setDimensions}>
        <ScatterPlot
          dataset={fightOrder}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
        />
      </Graphcard>
      <Graphcard name="Wipes antes da prog" setDimensions={setDimensions}>
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="wipesBeforeProg"
          tickajust={1}
        />
      </Graphcard>
      <Graphcard name="Wipes Total" setDimensions={setDimensions}>
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="wipesPerPhase"
          tickajust={1}
        />
      </Graphcard>
      <Graphcard name="Tempo antes da prog" setDimensions={setDimensions}>
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="progTime"
          tickajust={2.77778e-7}
        />
      </Graphcard>
      <Graphcard name="Tempo Total" setDimensions={setDimensions}>
        <BarChart
          dataset={progressionPerPhase}
          dimensions={dimensions}
          currentFightPhases={currentFightPhases}
          selection="totalTime"
          tickajust={2.77778e-7}
        />
      </Graphcard>
      <Graphcard name="Relação dos Pulls" setDimensions={setDimensions}>
        <Table
          tableColumns={tableColumns}
          tableData={tableData}
        />
      </Graphcard>
    </div>
  );
};

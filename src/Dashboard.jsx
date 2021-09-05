import React, { useState, useEffect, useMemo } from 'react';

import './dashboard.css';

import { csv } from 'd3';

import Header from './Views/header';
import Sidebar from './Views/sidebar';
import Titlebar from './Views/titlebar';
import Stats from './Views/stats';
import Graphs from './Views/graphs';

import { createColumns, createDataSource } from './Utils/tableUtils';
import { getFightLogs, getFightPhases, getFightIdByName } from './Utils/utils';

import calcTime from './DataProcessing/calcTime';
import calcProgressionPerPhase from './DataProcessing/calcProgressionPerPhase';
import calcPhaseProg from './DataProcessing/calcPhaseProg';
import calcFightOrder from './DataProcessing/calcFightOrder';

const getParams = () => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const foo = params.get('fight');
  if (foo) {
    return getFightIdByName(foo.toLowerCase());
  }
  return (0);
};
const params = getParams();

export default () => {
  // Selection
  const [currentFight, setCurrentFight] = useState(params); // Uwu, Ucob, Tea, etc..

  // Processed selection
  const currentFightPhases = getFightPhases(currentFight);

  // Base data
  const [fightData, setFightData] = useState(null);
  const [reportData, setReportData] = useState(null);

  // Processed data
  const processedData = useMemo(
    () => calcTime(reportData, fightData), [fightData, reportData],
  );
  const progressionPerPhase = useMemo(
    () => calcProgressionPerPhase(
      reportData, fightData, currentFightPhases,
    ), [fightData, reportData],
  );
  const progressionTotal = useMemo(
    () => calcPhaseProg(reportData, fightData), [fightData, reportData],
  );
  const fightOrder = useMemo(
    () => calcFightOrder(reportData, fightData), [fightData, reportData],
  );
  const tableColumns = useMemo(
    () => createColumns(currentFightPhases), [progressionTotal],
  );
  const tableData = useMemo(
    () => createDataSource(currentFightPhases, progressionTotal), [progressionTotal],
  );

  const loadCSV = (fightArray) => {
    csv(fightArray[0]).then((data) => {
      setFightData(data);
    });
    csv(fightArray[1]).then((data) => {
      setReportData(data);
    });
  };

  useEffect(() => {
    setFightData(null);
    setReportData(null);
    loadCSV(getFightLogs(currentFight));
  }, [currentFight]);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <Sidebar currentFight={currentFight} setCurrentFight={setCurrentFight} />
        <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <Titlebar currentFight={currentFight} />
          {processedData ? (<Stats data={processedData} />) : <></>}
          {
            (fightOrder && progressionPerPhase && tableColumns && tableData)
              ? (
                <Graphs
                  fightOrder={fightOrder}
                  progressionPerPhase={progressionPerPhase}
                  tableColumns={tableColumns}
                  tableData={tableData}
                  currentFightPhases={currentFightPhases}
                />
              ) : <></>
          }
        </div>
      </div>
    </>
  );
};

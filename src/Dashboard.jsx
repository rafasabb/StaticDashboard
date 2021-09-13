import React, { useState, useEffect, useMemo } from 'react';

import './dashboard.css';

import { csv } from 'd3';

import Header from './Views/header';
import Sidebar from './Views/sidebar';
import TitleBar from './Views/titlebar';
import Stats from './Views/stats';
import Graphs from './Views/graphs';

import { createFightColumns, createFightDataSource, createDeathColumns } from './Utils/tableUtils';
import {
  getFightLogs, getFightPhases, getFightIdByName, getClearImage,
} from './Utils/utils';
import getLanguage from './Constants/translationConstants';

import calcTime from './DataProcessing/calcTime';
import calcProgressionPerPhase from './DataProcessing/calcProgressionPerPhase';
import calcPhaseProg from './DataProcessing/calcPhaseProg';
import calcFightOrder from './DataProcessing/calcFightOrder';
import calcDeathsPerDay from './DataProcessing/calcDeathsPerDay';

const getParams = () => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const fight = params.get('fight');
  const lang = params.get('lang');
  const ret = { fight: 1, lang: 'en' };
  if (fight) {
    ret.fight = getFightIdByName(fight.toLowerCase());
  }
  if (lang) {
    ret.lang = lang.toLowerCase();
  }
  return ret;
};
const params = getParams();

export default () => {
  // Selection
  const [currentFight, setCurrentFight] = useState(params.fight); // Uwu, Ucob, Tea, etc..
  const [currentLanguage, setCurrentLanguage] = useState(params.lang);

  // Processed selection
  const currentFightPhases = getFightPhases(currentFight);

  // Base data
  const [fightData, setFightData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [deathsPerFightData, setDeathsPerFightData] = useState(null);

  // Processed data
  const language = useMemo(
    () => getLanguage(currentLanguage), [currentLanguage],
  );
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
  const deathsDay = useMemo(
    () => calcDeathsPerDay(reportData, fightData, deathsPerFightData),
    [reportData, fightData, deathsPerFightData],
  );
  const fightTableColumns = useMemo(
    () => createFightColumns(currentFightPhases, language.date), [progressionTotal, language],
  );
  const fightTableData = useMemo(
    () => createFightDataSource(currentFightPhases, progressionTotal), [progressionTotal],
  );
  const deathsTableColumns = useMemo(
    () => createDeathColumns(language.name), [language],
  );

  const loadCSV = (fightArray) => {
    csv(fightArray[0]).then((data) => {
      setFightData(data);
    });
    csv(fightArray[1]).then((data) => {
      setReportData(data);
    });
    csv(fightArray[3]).then((data) => {
      setDeathsPerFightData(data.filter((o) => o.name !== ''));
    });
  };

  useEffect(() => {
    setFightData(null);
    setReportData(null);
    setDeathsPerFightData(null);
    loadCSV(getFightLogs(currentFight));
  }, [currentFight]);

  return (
    <>
      <Header setCurrentLanguage={setCurrentLanguage} />
      <div className="flex flex-col md:flex-row">
        <Sidebar currentFight={currentFight} setCurrentFight={setCurrentFight} />
        <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <TitleBar currentFight={currentFight} />
          {processedData ? (<Stats language={language} data={processedData} />) : <></>}
          {
            (fightOrder
              && progressionPerPhase
              && fightTableColumns
              && fightTableData
              && deathsDay
            )
              ? (
                <Graphs
                  language={language}
                  clearImg={getClearImage(currentFight)}
                  fightOrder={fightOrder}
                  progressionPerPhase={progressionPerPhase}
                  fightTableColumns={fightTableColumns}
                  fightTableData={fightTableData}
                  deathsTableColumns={deathsTableColumns}
                  currentFightPhases={currentFightPhases}
                  deathsDay={deathsDay}
                />
              ) : <></>
          }
        </div>
      </div>
    </>
  );
};

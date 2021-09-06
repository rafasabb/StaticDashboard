const br = {
  progTime: 'Horas de Progressão Total',
  progPerWeek: 'Horas por Semana',
  raidDays: 'Dias de Raid',
  progWeeks: 'Semanas de Progressão',
  scatter: 'Progressão por pull',
  table1: 'Mortes por Mecânica',
  table2: 'Relação dos Dias',
  wipesBeforeProg: 'Numero de Wipes até a Progressão',
  wipesTotal: 'Total de Wipes por Fase',
  progTimePerPhase: 'Horas até a progressão',
  totalTimePerPhase: 'Total de tempo por Fase',
  name: 'Nome',
  date: 'Data',
  page: 'Página',
  of: 'de',
  photo: 'Foto da Clear',
};

const en = {
  progTime: 'Total Progression Time',
  progPerWeek: 'Hours per Week',
  raidDays: 'Raid Days',
  progWeeks: 'Weeks of Progression',
  scatter: 'Progression per pull',
  table1: 'Deaths per Mechanics',
  table2: 'List of Days',
  wipesBeforeProg: 'Number of Wipes before Progression',
  wipesTotal: 'Total Wipes per Phase',
  progTimePerPhase: 'Hours before progression',
  totalTimePerPhase: 'Total Time per Phase',
  name: 'Name',
  date: 'Date',
  page: 'Page',
  of: 'of',
  photo: 'Clear Photo',
};

const langList = { br, en };

export default (lang) => langList[lang];

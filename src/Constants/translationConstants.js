const br = {
  progTime: 'Horas Total',
  progPerWeek: 'Horas/Semana',
  raidDays: 'Dias de Raid',
  progWeeks: 'Semanas',
  scatter: 'Progressão por pull',
  table1: 'Mortes por Mecânica',
  table2: 'Relação dos Dias',
  wipesBeforeProg: 'Wipes até a Progressão',
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
  progTime: 'Total Time',
  progPerWeek: 'Hours/Week',
  raidDays: 'Raid Days',
  progWeeks: 'Weeks',
  scatter: 'Progression per pull',
  table1: 'Deaths per Mechanics',
  table2: 'List of Days',
  wipesBeforeProg: 'Wipes before Progression',
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

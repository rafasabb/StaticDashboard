import { UWU, UCOB, TEA } from '../Constants/fightConstants';
import { UWUParses, UCOBParses, TEAParses } from '../Constants/dataConstants';

export const getFightLogs = (current) => {
  switch (parseInt(current, 10)) {
    case 0:
      return [UWUParses.fightCsvUrL, UWUParses.reportCsvUrl];
    case 1:
      return [UCOBParses.fightCsvUrL, UCOBParses.reportCsvUrl];
    case 2:
      return [TEAParses.fightCsvUrL, TEAParses.reportCsvUrl];
    default:
      return [null, null];
  }
};

export const getFightName = (current) => {
  switch (parseInt(current, 10)) {
    case 0:
      return ['The Weapon\'s Refrain', 'green'];
    case 1:
      return ['The Unending Coil of Bahamut', 'purple'];
    case 2:
      return ['The Epic of Alexander', 'blue'];
    default:
      return ['', 'grey'];
  }
};

export const getFightPhases = (current) => {
  switch (parseInt(current, 10)) {
    case 0:
      return UWU;
    case 1:
      return UCOB;
    case 2:
      return TEA;
    default:
      return null;
  }
};

export const currentPhaseLoc = (currentFightPhases, num) => currentFightPhases.findIndex(
  (x) => x.number === num,
);

export const getFightIdByName = (current) => {
  switch (current.toLowerCase()) {
    case 'uwu':
      return 0;
    case 'ucob':
      return 1;
    case 'tea':
      return 2;
    default:
      return null;
  }
};

export const formatHour = (time) => {
  const pad = (n, z = 2) => (`00${n}`).slice(-z);

  return `${pad(time.hours)}:${pad(time.minutes)}`;
};

export const msToTime = (duration) => {
  // const milliseconds = Math.floor((duration % 1000) / 100);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)));
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const consistencyColor = (consistency) => {
  if (consistency <= 0.39) {
    return 'red';
  }
  if (consistency >= 0.40 && consistency <= 0.59) {
    return '#FFC857';
  }
  return 'blue';
};

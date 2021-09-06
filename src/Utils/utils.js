import { UWU, UCOB, TEA } from '../Constants/fightConstants';
import { UWUParses, UCOBParses, TEAParses } from '../Constants/dataConstants';

import uwuImg from '../img/uwu-clear.png';

export const getFightLogs = (current) => {
  switch (parseInt(current, 10)) {
    case 0:
      return [UWUParses.fightCsvUrL, UWUParses.reportCsvUrl, UWUParses.allDeathsCsvUrl];
    case 1:
      return [UCOBParses.fightCsvUrL, UCOBParses.reportCsvUrl, UCOBParses.allDeathsCsvUrl];
    case 2:
      return [TEAParses.fightCsvUrL, TEAParses.reportCsvUrl, TEAParses.allDeathsCsvUrl];
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

export const getClearImage = (current) => {
  switch (parseInt(current, 10)) {
    case 0:
      return uwuImg;
    case 1:
      return null;
    case 2:
      return null;
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

export const debounce = (fn, ms) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this);
    }, ms);
  };
};

export const hexToRgbA = (hex, opacity) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    // eslint-disable-next-line no-bitwise
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
  }
  throw new Error('Bad Hex');
};

export const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

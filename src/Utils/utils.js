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
  if (consistency >= 0.40 && consistency <= 0.69) {
    return '#FFC857';
  }
  return 'blue';
};

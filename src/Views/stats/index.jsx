/* eslint-disable react/prop-types */
import React from 'react';

import { formatHour } from '../../Utils/utils';
import Statcard from '../statcard';

// gray red yellow green blue indigo purple pink
export default (props) => {
  const { data } = props;
  return (
    <div className="flex flex-wrap">
      <Statcard title="Horas de Prog" data={formatHour(data.totalProgressionHours)} color="red" />
      <Statcard title="Horas p/semana" data={formatHour(data.averageHoursPerWeek)} color="indigo" />
      <Statcard title="Horas p/dia" data={formatHour(data.averageHoursPerDay)} color="purple" />
      <Statcard title="Semanas de Prog" data={data.weeksOfProgression} color="yellow" />
      <Statcard title="Dias de Raid" data={data.totalRaidDays} color="blue" />
      <Statcard title="Dias Corridos" data={data.totalDaysToClear} color="green" />
    </div>
  );
};

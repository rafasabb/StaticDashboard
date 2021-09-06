/* eslint-disable react/prop-types */
import React from 'react';

import { formatHour } from '../../Utils/utils';
import Statcard from '../statcard';
import Icons from '../../Utils/icons';

// gray red yellow green blue indigo purple pink
export default (props) => {
  const { data, language } = props;
  return (
    <div className="flex flex-wrap">
      <Statcard title={language.progTime} data={formatHour(data.totalProgressionHours)} color="red">
        <Icons type="mdiHistory" size={2} color="#fff" />
      </Statcard>
      <Statcard title={language.progPerWeek} data={formatHour(data.averageHoursPerWeek)} color="indigo">
        <Icons type="mdiClockTimeTwoOutline" size={2} color="#fff" />
      </Statcard>
      <Statcard title={language.raidDays} data={data.totalRaidDays} color="blue">
        <Icons type="mdiCalendarBlank" size={2} color="#fff" />
      </Statcard>
      <Statcard title={language.progWeeks} data={data.weeksOfProgression} color="yellow">
        <Icons type="mdiCalendarWeek" size={2} color="#fff" />
      </Statcard>
    </div>
  );
};

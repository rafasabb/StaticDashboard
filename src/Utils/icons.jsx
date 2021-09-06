/* eslint-disable react/prop-types */
import React from 'react';
import Icon from '@mdi/react';
import {
  mdiHistory,
  mdiClockTimeTwoOutline,
  mdiCalendarWeek,
  mdiCalendarBlank,
  mdiNumeric1CircleOutline,
  mdiNumeric2CircleOutline,
  mdiNumeric3CircleOutline,
} from '@mdi/js';

const icons = {
  mdiHistory,
  mdiClockTimeTwoOutline,
  mdiCalendarWeek,
  mdiCalendarBlank,
  mdiNumeric1CircleOutline,
  mdiNumeric2CircleOutline,
  mdiNumeric3CircleOutline,
};

export default (props) => {
  const {
    type, size, color, style,
  } = props;
  const IconType = icons[type];
  return (
    <Icon
      path={IconType}
      size={size}
      color={color}
      style={style}
    />
  );
};

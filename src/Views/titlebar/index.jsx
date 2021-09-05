/* eslint-disable react/prop-types */
import React from 'react';
import { getFightName } from '../../Utils/utils';

export default (props) => {
  const { currentFight } = props;
  const fight = getFightName(currentFight);
  return (
    <div className="bg-gray-800 pt-3">
      <div className={`rounded-tl-3xl bg-gradient-to-r from-${fight[1]}-500 to-gray-800 p-4 shadow text-2xl text-white`}>
        <h3 className="font-bold pl-2">{ fight[0] }</h3>
      </div>
    </div>
  );
};

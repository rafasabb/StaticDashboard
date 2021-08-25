/* eslint-disable react/prop-types */
import React from 'react';
import * as d3 from 'd3';

import { UWU } from '../../Constants/fightConstants';

export default (props) => {
  const {
    dataset,
    setPhase,
    selection,
    width,
    height,
  } = props;

  const margin = {
    top: 0,
    right: 10,
    bottom: 20,
    left: 5,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear().domain([0, dataset.length]).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain([0, 100.0]).range([innerHeight, 0]);
  const colorScale = () => {
    const domain = UWU.map((fight) => fight.number);
    const range = UWU.map((fight) => fight.color);
    return d3.scaleOrdinal().domain(domain).range(range);
  };

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
          {dataset.map((d, index) => (
            <g key={d.fightStart.getTime() / 1000}>
              <circle
                className={`dot_uwu_${d.lastPhase} dot${d.kill}`}
                cx={xScale(index)}
                cy={yScale(d.fightPercent)}
                r={5}
                fill={colorScale(d.lastPhase)}
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
};

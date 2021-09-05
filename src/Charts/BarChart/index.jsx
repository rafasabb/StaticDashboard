/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import { currentPhaseLoc } from '../../Utils/utils';

export default (props) => {
  const {
    dataset, currentFightPhases, dimensions, selection, tick,
  } = props;
  const [width, height] = dimensions;
  const [bars, setBars] = useState(null);

  const margin = {
    top: 0, right: 10, bottom: 20, left: 5,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yScale = d3.scaleBand()
    .domain(dataset.map((d) => d.name))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = d3.scaleLinear()
    .domain([0, Math.max(...dataset.map((o) => (o[selection])))])
    .range([0, innerWidth]);

  const setColorScale = () => {
    const domain = currentFightPhases.map((fight) => fight.number);
    const range = currentFightPhases.map((fight) => fight.color);
    return d3.scaleOrdinal().domain(domain).range(range);
  };
  const colorScale = setColorScale();
  const createBars = () => dataset.map((d) => (
    <g
      key={d.name}
    >
      <rect
        className={`bar p${currentPhaseLoc(currentFightPhases, d.phase)}`}
        x={0}
        y={yScale(d.name)}
        width={xScale(d[selection])}
        height={yScale.bandwidth()}
        style={{ fill: colorScale(d.phase) }}
      />
      <text
        className="value"
        style={{ textAnchor: 'end' }}
        dx="-2"
        dy="1.3em"
        x={xScale(d[selection])}
        y={yScale(d.name)}
      >
        {d.name}
      </text>
    </g>
  ));

  useEffect(() => {
    setBars(createBars());
  }, [dataset, dimensions]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
          xScale.ticks().map((tickValue) => (
            <g key={xScale(tickValue)} transform={`translate(${xScale(tickValue)},0)`}>
              <line y2={innerHeight} stroke="#C0C0BB" />
              <text dy=".71em" style={{ textAnchor: 'middle', fill: '#C0C0BB' }} y={innerHeight + 3}>{Math.floor(tickValue * tick)}</text>
            </g>
          ))
        }
        <g>
          {
            bars
          }
        </g>
      </g>
    </svg>
  );
};

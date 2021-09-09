/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import { currentPhaseLoc, hexToRgbA } from '../../Utils/utils';

export default (props) => {
  const {
    dataset, currentFightPhases, dimensions, selection, tick,
  } = props;
  const [width, height] = dimensions;
  const [bars, setBars] = useState(null);
  const [tickSize, setTickSize] = useState(6);

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
        style={{
          fill: hexToRgbA(colorScale(d.phase), '0.75'),
          strokeWidth: 2,
          stroke: hexToRgbA(colorScale(d.phase), '1'),
        }}
      />
      <text
        className="font-bold"
        style={{ textAnchor: 'end' }}
        dx="-5"
        dy="1.6em"
        x={xScale(d[selection])}
        y={yScale(d.name)}
        fill="#fff"
      >
        {d.name}
      </text>
    </g>
  ));

  useEffect(() => {
    if (width >= 500) {
      setTickSize(8);
    } else if (width < 500 && width >= 300) {
      setTickSize(6);
    } else {
      setTickSize(5);
    }
    setBars(createBars());
  }, [dataset, dimensions]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
          xScale.ticks(tickSize).map((tickValue) => (
            <g key={xScale(tickValue)} transform={`translate(${xScale(tickValue)},0)`}>
              <line y2={innerHeight} stroke="#C0C0BB" />
              <text dy=".71em" style={{ textAnchor: 'middle', fill: '#C0C0BB' }} y={innerHeight + 3}>{(tickValue * tick).toFixed(1)}</text>
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

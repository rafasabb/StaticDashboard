/* eslint-disable react/prop-types */
import React from 'react';
import * as d3 from 'd3';

export default (props) => {
  const {
    dataset, setPhase, selection, width, height,
  } = props;
  const margin = {
    top: 0, right: 10, bottom: 20, left: 5,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yScale = d3.scaleBand()
    .domain(dataset.map((d) => d.label))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = d3.scaleLinear()
    .domain([0, Math.max(...dataset.map((o) => (selection === 'a' ? o.pulls : o.progTime)))])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
          xScale.ticks().map((tickValue) => (
            <g key={xScale(tickValue)} transform={`translate(${xScale(tickValue)},0)`}>
              <line y2={innerHeight} stroke="#C0C0BB" />
              <text dy=".71em" style={{ textAnchor: 'middle', fill: '#C0C0BB' }} y={innerHeight + 3}>{tickValue}</text>
            </g>
          ))
        }

        {
          dataset.map((d) => (
            <g
              key={d.label}
              onMouseEnter={() => setPhase(d.label)}
              onMouseLeave={() => setPhase(null)}
            >
              <rect
                x={0}
                y={yScale(d.label)}
                width={xScale(selection === 'a' ? d.pulls : d.progTime)}
                height={yScale.bandwidth()}
                style={{ fill: d.color }}
              />
              <text
                className="value"
                style={{ textAnchor: 'end' }}
                dx="-2"
                dy="1.3em"
                x={xScale(selection === 'a' ? d.pulls : d.progTime)}
                y={yScale(d.label)}
              >
                {d.label}
              </text>
            </g>
          ))
        }
      </g>
    </svg>
  );
};

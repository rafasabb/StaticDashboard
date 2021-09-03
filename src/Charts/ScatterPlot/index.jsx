/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import { currentPhaseLoc } from '../../Utils/utils';

// TODO - auto resize
export default (props) => {
  const {
    dataset,
    currentPhase,
    setCurrentPhase,
    currentReport,
    dimensions,
    currentFightPhases,
  } = props;
  const [width, height] = dimensions;
  const [scatter, setScatter] = useState(null);

  const margin = {
    top: 10,
    right: 10,
    bottom: 15,
    left: 22,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear().domain([0, dataset.length]).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain([0, 100.0]).range([innerHeight, 0]);
  const setColorScale = () => {
    const domain = currentFightPhases.map((fight) => fight.number);
    const range = currentFightPhases.map((fight) => fight.color);
    return d3.scaleOrdinal().domain(domain).range(range);
  };
  const colorScale = setColorScale();

  const createScatter = () => dataset.map((d, index) => (
    <g
      key={d.fightStart.getTime() / 1000}
      onMouseEnter={() => setCurrentPhase(d.lastPhase)}
      onMouseLeave={() => setCurrentPhase(null)}
    >
      <circle
        className={`dot p${currentPhaseLoc(currentFightPhases, d.phase)} k${d.kill}`}
        cx={xScale(index)}
        cy={yScale(d.fightPercent)}
        r={4}
        prop={d.kill ? 'yellow' : colorScale(d.lastPhase)}
        fill={d.kill ? 'yellow' : colorScale(d.lastPhase)}
        stroke={d.code === currentReport ? 'black' : ''}
        strokeWidth={d.code === currentReport ? '1' : ''}
      />
    </g>
  ));

  useEffect(() => {
    console.log(currentPhase);
    const cPhase = currentPhaseLoc(currentFightPhases, currentPhase);
    if (cPhase !== -1) {
      d3.selectAll('.dot')
        .transition()
        .duration(200)
        .style('fill', 'lightgrey')
        .attr('r', 2);

      d3.selectAll(`.p${cPhase}`)
        .transition()
        .duration(200)
        .style('fill', colorScale(currentPhase))
        .attr('r', 5);
    } else {
      setScatter(createScatter());
    }
  }, [currentPhase]);

  useEffect(() => {
    setScatter(createScatter());
  }, [dataset, currentReport, dimensions]);

  return (
    <svg width={width} height={height} className="path">
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
          yScale.ticks().map((tickValue) => (
            <g key={yScale(tickValue)} transform={`translate(0,${yScale(tickValue)})`}>
              <text dx=".60em" dy=".40em" style={{ textAnchor: 'middle', fill: '#C0C0BB' }} x={-20}>{tickValue}</text>
            </g>
          ))
        }
        <g key={currentPhase + currentReport}>
          {scatter}
        </g>
      </g>
    </svg>
  );
};

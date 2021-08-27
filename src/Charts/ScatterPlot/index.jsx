/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import { UWU } from '../../Constants/fightConstants';

// TODO - auto resize
export default (props) => {
  const {
    dataset,
    currentPhase,
    setCurrentPhase,
    currentReport,
    width,
    height,
  } = props;

  const [scatter, setScatter] = useState(null);

  const margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 5,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear().domain([0, dataset.length]).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain([0, 100.0]).range([innerHeight, 0]);
  const setColorScale = () => {
    const domain = UWU.map((fight) => fight.number);
    const range = UWU.map((fight) => fight.color);
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
        className={`dot p${d.lastPhase} k${d.kill}`}
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
    if (currentPhase) {
      d3.selectAll('.dot')
        .transition()
        .duration(200)
        .style('fill', 'lightgrey')
        .attr('r', 2);

      d3.selectAll(`.p${currentPhase}`)
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
  }, [dataset, currentReport]);

  return (
    <svg width={width} height={height} className="path">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g key={currentPhase + currentReport}>
          {scatter}
        </g>
      </g>
    </svg>
  );
};

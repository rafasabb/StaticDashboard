/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

import { UWU } from '../../Constants/fightConstants';

export default (props) => {
  const {
    dataset,
    currentPhase,
    setCurrentPhase,
    width,
    height,
  } = props;

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
    }
  }, [currentPhase]);

  const highlight = (d) => {
    const selectedPhase = d ? d.lastPhase : 0;
    setCurrentPhase(selectedPhase);
  };

  return (
    <svg width={width} height={height} className="path">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
          {dataset.map((d, index) => (
            <g key={d.fightStart.getTime() / 1000}>
              <circle
                className={`dot p${d.lastPhase} k${d.kill}`}
                cx={xScale(index)}
                cy={yScale(d.fightPercent)}
                r={4}
                fill={d.kill ? 'yellow' : colorScale(d.lastPhase)}
                onMouseEnter={() => highlight(d)}
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
};

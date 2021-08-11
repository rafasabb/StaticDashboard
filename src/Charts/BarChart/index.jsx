import React from 'react';
import * as d3 from 'd3';

export default () => {
  const prp = { width: 295, height: 155 };
  const margin = {
    top: 0, right: 10, bottom: 20, left: 5,
  };
  const innerWidth = prp.width - margin.left - margin.right;
  const innerHeight = prp.height - margin.top - margin.bottom;

  const dataset = [
    { label: 'Garuda', count: 12, color: '#90BE6D' },
    { label: 'Ifrit', count: 32, color: '#DB3A34' },
    { label: 'Titan', count: 72, color: '#FFC857' },
    { label: 'Ultima', count: 53, color: '#4682B4' },
  ];

  const yScale = d3.scaleBand()
    .domain(dataset.map((d) => d.label))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = d3.scaleLinear()
    .domain([0, Math.max(...dataset.map((o) => o.count))])
    .range([0, innerWidth]);

  return (
    <svg width={prp.width} height={prp.height}>
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
                          <g key={d.label}>
                            <rect
                              x={0}
                              y={yScale(d.label)}
                              width={xScale(d.count)}
                              height={yScale.bandwidth()}
                              style={{ fill: d.color }}
                            />
                            <text
                              className="value"
                              style={{ textAnchor: 'end' }}
                              dx="-2"
                              dy="1.3em"
                              x={xScale(d.count)}
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

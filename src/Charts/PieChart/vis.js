import * as d3 from 'd3';

const draw = (props) => {
  const dataset = [
    { label: 'Idle', count: 37.5 },
    { label: 'Combat', count: 13.9 },
  ];

  d3.select('.vis-piechart > *').remove();

  const margin = {
    top: 20, right: 10, bottom: 30, left: -20,
  };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  const svg = d3.select('.vis-piechart')
    .append('svg')
    .classed('svg-content', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal()
    .range(['steelblue', 'LightBlue', 'LightSteelBlue']);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  const pie = d3.pie()
    .value((d) => d.count)
    .sort(null);

  svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => color(d.data.label));
};

export default draw;

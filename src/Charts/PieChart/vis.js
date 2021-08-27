import * as d3 from 'd3';

// TODO - Consertar essa porra
const draw = (props) => {
  const { data, dimensions } = props;

  const [width, height] = dimensions;

  const fixDate = (date) => date.hours * 60 + date.minutes;

  const dataset = [
    { label: 'Idle', count: fixDate(data[0]) },
    { label: 'Combat', count: fixDate(data[1]) },
  ];

  d3.select('.vis-piechart > *').remove();

  const margin = {
    top: 0, right: 0, bottom: 0, left: 0,
  };
  const innerWidth = Math.min(width, height) - margin.left - margin.right;
  const innerHeight = Math.min(width, height) - margin.top - margin.bottom;

  const svg = d3.select('.vis-piechart')
    .append('svg')
    .classed('svg-content', true)
    .attr('width', Math.min(width, height))
    .attr('height', Math.min(width, height))
    .append('g')
    .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);

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

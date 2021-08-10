import * as d3 from 'd3';

const draw = (props) => {
  const data = props.data;
  const options = ['Combat', 'Idle'];

  const dataset = [
    { label: 'Idle', count: 37.5},
    { label: 'Combat', count: 13.9},
  ]

  d3.select('.vis-piechart > *').remove();

  const margin = { top: 20, right: 10, bottom: 30, left: -20 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  let svg = d3.select('.vis-piechart')
    .append('svg')
    .classed("svg-content", true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')');

  let radius = Math.min(width, height) / 2;

  let color = d3.scaleOrdinal()
    .range(['steelblue', 'LightBlue', 'LightSteelBlue']);

  let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  let pie = d3.pie()
    .value(function (d) { return d.count; })
    .sort(null);

  svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
      return color(d.data.label);
    });

  
}

export default draw;
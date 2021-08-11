import React, { Component } from 'react';
import draw from './vis';

export default class PieChart extends Component {
  componentDidMount() {
    draw(this.props);
  }

  componentDidUpdate() {
    draw(this.props);
  }

  render() {
    return (
      <div className="vis-piechart" />
    );
  }
}

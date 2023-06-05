import React from 'react';
import {XYPlot, XAxis, YAxis, LineSeries} from 'react-vis';

function Graph({data}) {
  return (
    <XYPlot width={300} height={300}>
      <XAxis />
      <YAxis />
      <LineSeries data={data} />
    </XYPlot>
  );
}

export default Graph;

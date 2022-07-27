import React from 'react';
import PlotlyChart from '@site/src/PlotlyChart';
import FallbackSvg from '!!file-loader!./fallback.svg';

import type { PlotlyDataLayoutConfig } from 'plotly.js-basic-dist';

import data from './monthly_data.json';

const cumulativeSum = (values: number[]) => {
  let acc = 0;
  return values.map(value => acc += value);
};

/**
 * Offset from 2020-11-18
 */
const offsetToDate = (monthOffset: number) => {
  const date = new Date(2020, 10 /* zero-based */, 18);
  date.setMonth(date.getMonth() + monthOffset);
  return date;
};

const formatMonthOffsets = (monthOffsets: number[]) => {
  return monthOffsets.map(monthOffset => {
    return offsetToDate(monthOffset).toLocaleDateString(undefined, { dateStyle: 'short' });
  });
};

const currentOffset = (monthOffsets: number[]) => {
  const nextOffset = monthOffsets.findIndex(monthOffset => {
    return offsetToDate(monthOffset).getTime() > new Date().getTime();
  });
  if (nextOffset - 1 < 0) return '';
  const previousOffset = monthOffsets[nextOffset - 1];
  return offsetToDate(previousOffset).toLocaleDateString(undefined, { dateStyle: 'short' });
};

const TokenDistributionChart = () => {
  const chart: PlotlyDataLayoutConfig = {
    data: [
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.coreContributors),
        mode: 'lines',
        name: data.labels.coreContributors,
        stackgroup: 'one',
        marker: {color: data.colors.coreContributors},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.backers),
        mode: 'lines',
        name: data.labels.backers,
        stackgroup: 'one',
        marker: {color: data.colors.backers},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.foundation),
        mode: 'lines',
        name: data.labels.foundation,
        stackgroup: 'one',
        marker: {color: data.colors.foundation},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.communityAndEcosystem),
        mode: 'lines',
        name: data.labels.communityAndEcosystem,
        stackgroup: 'one',
        marker: {color: data.colors.communityAndEcosystem},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.strategicPartnersAndReserve),
        mode: 'lines',
        name: data.labels.strategicPartnersAndReserve,
        stackgroup: 'one',
        marker: {color: data.colors.strategicPartnersAndReserve},
      },
      {
        x: [currentOffset(data.months), currentOffset(data.months)],
        y: [0, 8000000000],
        mode: 'lines',
        name: 'Today',
        marker: {color: 'gray'},
        hoverinfo: 'none',
        showlegend: false,
      },
    ],

    layout: {
      title: {
        text: '10-Year Token Circulation Schedule',
        font: {
          size: 20,
        },
        x: 0.05,
        yref: 'container',
        y: 0.95,
      },
      xaxis: {
        tickangle: -45,
        // Show every 6th tick. Every 3rd is an actual data point, but that's too dense for mobile.
        dtick: 6,
      },
      yaxis: {
        title: 'Tokens in Circulation',
        fixedrange: true,
        rangemode: 'nonnegative',
      },
      margin: {
        t: 120,
        r: 0,
      },
      legend: {
        orientation: "h",
        x: 0.5,
        xanchor: 'center',
        y: 1.15,
        yanchor: 'top',
      },
      hoverlabel: {
        namelength: 30,
      },
      hovermode: 'x unified',
    },

    config: {
    },
  };

  // To generate fallback.svg:
  // chart.data = chart.data.filter(d => d.name !== 'Today');
  // chart.layout!.xaxis!.tickangle = -90;
  // chart.layout!.xaxis!.dtick = 3;
  // const PlotlyBasic: typeof import('plotly.js-basic-dist') = require('plotly.js-basic-dist');
  // PlotlyBasic.downloadImage(chart, { filename: 'fallback', format:'svg', width: 960, height: 600 });

  return <PlotlyChart label="Circulation Schedule" chart={chart} fallbackSvg={FallbackSvg} />;
};

export default TokenDistributionChart;

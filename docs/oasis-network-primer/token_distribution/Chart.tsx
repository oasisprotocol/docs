import React from 'react';
import PlotlyChart from '@site/src/PlotlyChart';
import FallbackSvg from './fallback.svg';

import type { PlotlyDataLayoutConfig } from 'plotly.js-basic-dist';

import data from './monthly_data.json';

const cumulativeSum = (values: number[]) => {
  let acc = 0;
  return values.map(value => acc += value);
};

/**
 * Offset from 2020-11-18
 */
const formatMonthOffsets = (monthOffsets: number[]) => {
  return monthOffsets.map(monthOffset => {
    const date = new Date(2020, 10 /* zero-based */, 18);
    date.setMonth(date.getMonth() + monthOffset);
    return date.toLocaleDateString(undefined, { dateStyle: 'short' });
  });
};

const TokenDistributionChart = () => {
  const chart: PlotlyDataLayoutConfig = {
    data: [
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.coreContributors),
        mode: 'lines',
        name: 'Core Contributors',
        stackgroup: 'one',
        marker: {color: 'blue'},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.backers),
        mode: 'lines',
        name: 'Backers',
        stackgroup: 'one',
        marker: {color: 'red'},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.foundation),
        mode: 'lines',
        name: 'Foundation Endowment',
        stackgroup: 'one',
        marker: {color: 'gold'},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.communityAndEcosystem),
        mode: 'lines',
        name: 'Community & Ecosystem',
        stackgroup: 'one',
        marker: {color: 'green'},
      },
      {
        x: formatMonthOffsets(data.months),
        y: cumulativeSum(data.strategicPartnersAndReserve),
        mode: 'lines',
        name: 'Strategic Partners & Reserve',
        stackgroup: 'one',
        marker: {color: 'orange'},
      },
    ],

    layout: {
      title: {
        text: '10-Year Token Circulation Schedule',
        font: {
          size: 20,
        },
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

  return <PlotlyChart label="Circulation Schedule" chart={chart} fallbackSvg={FallbackSvg} />;
};

export default TokenDistributionChart;

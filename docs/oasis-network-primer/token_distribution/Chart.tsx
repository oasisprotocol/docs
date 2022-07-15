import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import plotlyPyDark from '@site/src/plotly-py-templates/plotly_dark.json';
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
  const { colorMode } = useColorMode();

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
      template: colorMode === 'dark' ? plotlyPyDark : undefined,
      paper_bgcolor: colorMode === 'dark' ? '#1b1b1d' : undefined, // Match --ifm-background-color
      plot_bgcolor: colorMode === 'dark' ? '#1b1b1d' : undefined, // Match --ifm-background-color


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
      autosize: true,
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
      showLink: true,
      plotlyServerURL: 'https://chart-studio.plotly.com',
    },
  };

  return (
    <div>
      <BrowserOnly
        fallback={
          <div>
            <FallbackSvg aria-label='Circulation Schedule' style={{ width: '100%' }} className="text--center" ></FallbackSvg>
            <p className="text--center"><i>Enable javascript to see interactive chart</i></p>
          </div>
        }
      >
        {() => {
          const PlotlyBasic: typeof import('plotly.js-basic-dist') = require('plotly.js-basic-dist');
          // To generate fallback.svg:
          // PlotlyBasic.downloadImage(chart, { filename: 'fallback', format:'svg', width: 960, height: 600 })

          const createPlotlyComponent: typeof import('react-plotly.js/factory').default = require('react-plotly.js/factory').default;
          const Plot = createPlotlyComponent(PlotlyBasic);

          return (
            <Plot
              data={chart.data}
              layout={chart.layout!}
              config={chart.config!}
              useResizeHandler={true}
              style={{ width: '100%', height: '600px' }}
            />
          );
        }}
      </BrowserOnly>
      <p></p>
    </div>
  );
};

export default TokenDistributionChart;

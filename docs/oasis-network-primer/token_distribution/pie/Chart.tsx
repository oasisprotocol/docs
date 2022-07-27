import React from 'react';
import PlotlyChart from '@site/src/PlotlyChart';
import FallbackSvg from '!!file-loader!./fallback.svg';

import type { PlotlyDataLayoutConfig } from 'plotly.js-basic-dist';

import data from '../monthly_data.json';

const sum = (values: number[]) => {
  return values.reduce((acc, value) => acc + value, 0);
};

const FinalDistributionPieChart = () => {
  const chart: PlotlyDataLayoutConfig = {
    data: [
      {
        values: [
          sum(data.coreContributors),
          sum(data.backers),
          sum(data.foundation),
          sum(data.communityAndEcosystem),
          sum(data.strategicPartnersAndReserve),
          2_350_000_000,
        ],
        labels: [
          data.labels.coreContributors,
          data.labels.backers,
          data.labels.foundation,
          data.labels.communityAndEcosystem,
          data.labels.strategicPartnersAndReserve,
          data.labels.stakingRewards,
        ],
        type: 'pie',
        marker: {
          colors: [
            data.colors.coreContributors,
            data.colors.backers,
            data.colors.foundation,
            data.colors.communityAndEcosystem,
            data.colors.strategicPartnersAndReserve,
            data.colors.stakingRewards,
          ],
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        automargin: true,
      },
    ],

    layout: {
      title: {
        text: 'Token Distribution',
        font: {
          size: 20,
        },
        yref: 'container',
        y: 0.95,
      },
      margin: {
        t: 50,
        b: 50,
        l: 0,
        r: 0,
      },
      showlegend: false,
    },

    config: {
    },
  };

  // To generate fallback.svg:
  // const PlotlyBasic: typeof import('plotly.js-basic-dist') = require('plotly.js-basic-dist');
  // PlotlyBasic.downloadImage(chart, { filename: 'fallback', format:'svg', width: 960, height: 400 });

  return <PlotlyChart label="Token Distribution" height={400} chart={chart} fallbackSvg={FallbackSvg} />;
};

export default FinalDistributionPieChart;

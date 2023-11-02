import React from 'react';
import PlotlyChart from '@site/src/PlotlyChart';
import FallbackSvg from '!!file-loader!./fallback.svg';

import type { PlotlyDataLayoutConfig } from 'plotly.js-basic-dist';

import data from './data.json';

const knownOffsets = {
  beta: { epoch: 0, date: '2020-10-01T16:00:00Z' },
  mainnet: { epoch: 1170, date: '2020-11-18T16:00:00.000Z' },
  recent: { epoch: 15835, date: '2022-07-20T16:11:11.000Z' },

  // epoch from https://oasismonitor.com/block/4000000
  // time from https://www.oasisscan.com/blocks/4000000
  block4M: { epoch: 6664, date: '2021-07-05T04:42:51.000Z' },
  block5M: { epoch: 8328, date: '2021-09-12T03:57:19.000Z' },
  block6M: { epoch: 9992, date: '2021-11-19T23:18:41.000Z' },
  block7M: { epoch: 11656, date: '2022-01-28T05:06:25.000Z' },
  block8M: { epoch: 13320, date: '2022-04-07T22:49:44.000Z' },
  block9M: { epoch: 14987, date: '2022-06-15T16:22:57.000Z' },
};
const offsetFrom = knownOffsets.recent;

const estimatedEpochsPerHour = (knownOffsets.recent.epoch - knownOffsets.mainnet.epoch) / ((new Date(knownOffsets.recent.date).getTime() - new Date(knownOffsets.mainnet.date).getTime()) / 1000 / 60 / 60);

// From genesis "reward_factor_epoch_signed": "1"
const rewardFactorEpochSigned = 1;
// https://github.com/oasisprotocol/oasis-core/blob/d8e352b/go/staking/api/rewards.go#L22
const rewardAmountDenominator = 100_000_000;

const estimateEpochDates = (epochOffsets: number[]) => {
  return epochOffsets
      .map(untilEpoch => {
      const timeOffset = (untilEpoch - offsetFrom.epoch) / estimatedEpochsPerHour * 60 * 60 * 1000;
      const date = new Date(new Date(offsetFrom.date).getTime() + timeOffset).toISOString();
      return date;
    });
};

const estimateAPY = (scaleRewards: number[]) => {
  return scaleRewards
    .map(scale => {
      const estimatedEpochsPerYear = 365 * 24 * estimatedEpochsPerHour;
      const rewardPerEpoch = scale * rewardFactorEpochSigned / rewardAmountDenominator;
      // Better numerical precision than yearlyCompoundedRate = (1 + rewardPerEpoch)**estimatedEpochsPerYear - 1
      const yearlyCompoundedRate = Math.expm1(Math.log1p(rewardPerEpoch) * estimatedEpochsPerYear)
      return yearlyCompoundedRate;
    });
};


const StakingRewardsChart = () => {
  const chart: PlotlyDataLayoutConfig = {
    data: [
      {
        x: estimateEpochDates(data.map(d => d.untilEpoch)),
        y: estimateAPY(data.map(d => d.scale)),
        mode: 'lines',
        name: 'Annualized rewards',
        marker: {color: '#4285F4'},
        text: data.map(d => {
          const percentPerEpoch = 100 * d.scale * rewardFactorEpochSigned / rewardAmountDenominator;
          return `<i>Reward per epoch: ${percentPerEpoch}%<br>Epoch: ${d.untilEpoch}</i>`;
        }),
        hoverinfo: 'all',
      },
      {
        x: [new Date().toISOString(), new Date().toISOString()],
        y: [0, 0.205],
        mode: 'lines',
        name: 'Today',
        marker: {color: 'gray'},
        hoverinfo: 'none',
        showlegend: false,
      },
    ],

    layout: {
      title: {
        text: 'Staking Rewards Schedule (time estimated from epoch interval)',
        font: {
          size: 20,
        },
        x: 0.05,
        yref: 'container',
        y: 0.95,
      },
      xaxis: {
        tickangle: -45,
      },
      yaxis: {
        title: 'Estimated Annualized Rewards',
        fixedrange: true,
        tickformat: '0%',
        hoverformat: '.3%',
        dtick: 0.02,
        rangemode: 'nonnegative',
      },
      margin: {
        r: 0,
      },
      showlegend: false,
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
  // chart.layout!.xaxis!.nticks = 30;
  // const PlotlyBasic: typeof import('plotly.js-basic-dist') = require('plotly.js-basic-dist');
  // PlotlyBasic.downloadImage(chart, { filename: 'fallback', format:'svg', width: 960, height: 600 });

  return <PlotlyChart label="Staking Rewards Schedule (time estimated from epoch interval)" chart={chart} fallbackSvg={FallbackSvg} />;
};

export default StakingRewardsChart;

function testEstimatedEpochDates() {
  const diffHoursFormatter = new Intl.NumberFormat(undefined, {
    style: 'unit',
    unit: 'hour',
    unitDisplay: 'long',
    signDisplay: 'always',
    maximumFractionDigits: 1,
  });

  console.info('DEV: estimatedEpochsPerHour', estimatedEpochsPerHour);
  console.info(
    'DEV: diff between estimateEpochDates and known dates',
    Object.entries(knownOffsets).map(([epochName, {epoch, date}]) => {
      const estimatedTime = new Date(estimateEpochDates([epoch])[0]).getTime();
      const indexedTime = new Date(date).getTime();
      const diffHours = (indexedTime - estimatedTime) / 1000 / 60 / 60;
      return `at ${epochName} (${epoch}): ${diffHoursFormatter.format(diffHours)}`;
    })
  );
}
if (process.env.NODE_ENV === 'development') testEstimatedEpochDates();

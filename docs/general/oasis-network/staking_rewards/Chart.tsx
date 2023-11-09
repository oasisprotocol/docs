import React from 'react';
import PlotlyChart from '@site/src/PlotlyChart';
import FallbackSvg from '!!file-loader!./fallback.svg';

import type { PlotlyDataLayoutConfig } from 'plotly.js-basic-dist';

import data from './data.json';

const knownOffsets = {
  beta: { epoch: 0, date: '2020-10-01T16:00:00Z' },
  mainnet: { epoch: 1170, date: '2020-11-18T16:00:00.000Z' },
  epoch15835: { epoch: 15835, date: '2022-07-20T16:11:11.000Z' },
  epoch18653: { epoch: 18653, date: '2022-11-13T13:33:25.000Z' },

  // epoch from https://oasismonitor.com/block/4000000
  // time from https://www.oasisscan.com/blocks/4000000
  block4M: { epoch: 6664, date: '2021-07-05T04:42:51.000Z' },
  block5M: { epoch: 8328, date: '2021-09-12T03:57:19.000Z' },
  block6M: { epoch: 9992, date: '2021-11-19T23:18:41.000Z' },
  block7M: { epoch: 11656, date: '2022-01-28T05:06:25.000Z' },
  block8M: { epoch: 13320, date: '2022-04-07T22:49:44.000Z' },
  // Damask Upgrade was at https://api.oasisscan.com/mainnet/chain/block/8048956
  block9M: { epoch: 14987, date: '2022-06-15T16:22:57.000Z' },
  block10M: { epoch: 16653, date: '2022-08-23T09:29:12.000Z' },
  block11M: { epoch: 18320, date: '2022-10-30T22:41:53.000Z' },
  block12M: { epoch: 19987, date: '2023-01-07T03:06:08.000Z' },
  block13M: { epoch: 21653, date: '2023-03-16T05:47:42.000Z' },
  block14M: { epoch: 23320, date: '2023-05-22T22:04:26.000Z' },
  block15M: { epoch: 24987, date: '2023-07-29T13:10:58.000Z' },
  block16M: { epoch: 26653, date: '2023-10-05T04:13:33.000Z' },

  recent: { epoch: 27320, date: '2023-11-01T03:48:29.000Z' },
};

// Estimate up to epoch 15835 instead of Damask for consistency with how we made
// the first iteration of estimations. And it mostly covers pre-Damask epochs.
// Switch between estimates at steeper curve at epoch 18653.
const estimatedEpochsPerHourPreDamask = (knownOffsets.epoch15835.epoch - knownOffsets.mainnet.epoch) / ((new Date(knownOffsets.epoch15835.date).getTime() - new Date(knownOffsets.mainnet.date).getTime()) / 1000 / 60 / 60);
const estimatedEpochsPerHourAfterDamask = (knownOffsets.recent.epoch - knownOffsets.block12M.epoch) / ((new Date(knownOffsets.recent.date).getTime() - new Date(knownOffsets.block12M.date).getTime()) / 1000 / 60 / 60);

// From genesis "reward_factor_epoch_signed": "1"
const rewardFactorEpochSigned = 1;
// https://github.com/oasisprotocol/oasis-core/blob/d8e352b/go/staking/api/rewards.go#L22
const rewardAmountDenominator = 100_000_000;

const estimateEpochDatesAndAPY = (data: Array<{ untilEpoch: number, scale: number }>) => {
  return data
    .map(({ untilEpoch, scale }) => {
      const estimatedEpochsPerHour = untilEpoch > knownOffsets.epoch18653.epoch ? estimatedEpochsPerHourAfterDamask : estimatedEpochsPerHourPreDamask
      const offsetFrom = untilEpoch > knownOffsets.epoch18653.epoch ? knownOffsets.recent : knownOffsets.epoch15835;

      const timeOffset = (untilEpoch - offsetFrom.epoch) / estimatedEpochsPerHour * 60 * 60 * 1000;
      const date = new Date(new Date(offsetFrom.date).getTime() + timeOffset).toISOString();

      const estimatedEpochsPerYear = 365 * 24 * estimatedEpochsPerHour;
      const rewardPerEpoch = scale * rewardFactorEpochSigned / rewardAmountDenominator;
      // Better numerical precision than yearlyCompoundedRate = (1 + rewardPerEpoch)**estimatedEpochsPerYear - 1
      const yearlyCompoundedRate = Math.expm1(Math.log1p(rewardPerEpoch) * estimatedEpochsPerYear)

      return { untilEpoch, scale, date, rewardPerEpoch, yearlyCompoundedRate };
    });
};


const StakingRewardsChart = () => {
  const estimates = estimateEpochDatesAndAPY(data)
  const chart: PlotlyDataLayoutConfig = {
    data: [
      {
        x: estimates.map(d => d.date),
        y: estimates.map(d => d.yearlyCompoundedRate),
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

  // To generate data.csv:
  // const csv = [
  //   ['Until epoch', 'Estimated date', 'Reward per epoch %', 'Estimated annualized rewards %'].join(','),
  //   ...estimates.map((d) => [d.untilEpoch, d.date, (d.rewardPerEpoch * 100).toFixed(6), (d.yearlyCompoundedRate * 100).toFixed(4)].join(','))
  // ].join('\n')
  // console.log(csv)
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

  console.info('DEV: estimatedEpochsPerHourPreDamask', estimatedEpochsPerHourPreDamask);
  console.info('DEV: estimatedEpochsPerHourAfterDamask', estimatedEpochsPerHourAfterDamask);
  console.info(
    'DEV: diff between estimates and known dates',
    Object.entries(knownOffsets).map(([epochName, {epoch, date}]) => {
      const estimatedTime = new Date(estimateEpochDatesAndAPY([{ untilEpoch: epoch, scale: 1 }])[0].date).getTime();
      const indexedTime = new Date(date).getTime();
      const diffHours = (indexedTime - estimatedTime) / 1000 / 60 / 60;
      return `at ${epochName} (${epoch}): ${diffHoursFormatter.format(diffHours)}`;
    })
  );
}
if (process.env.NODE_ENV === 'development') testEstimatedEpochDates();

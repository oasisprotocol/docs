import React from 'react';
import PlotlyChart from '@site/src/PlotlyChart';
import FallbackSvg from './fallback.svg';

import type { PlotlyDataLayoutConfig } from 'plotly.js-basic-dist';

import data from './data.json';

const offsetFrom = { epoch: 15835, date: '2022-07-20T16:11:11.000Z' };

const estimatedEpochsPerHour = 1;
const estimatedEpochsPerYear = 365 * 24 * estimatedEpochsPerHour;

// https://github.com/oasisprotocol/oasis-core/blob/d8e352b/go/staking/api/rewards.go#L22
const rewardAmountDenominator = 100_000_000;

const estimateEpochDates = (epochOffsets: number[]) => {
  return epochOffsets
    .map(epochOffset => {
      const timeOffset = (epochOffset - offsetFrom.epoch) / estimatedEpochsPerHour * 60 * 60 * 1000;
      const date = new Date(new Date(offsetFrom.date).getTime() + timeOffset);
      return date.toISOString();
    });
};

const estimateAPY = (scaleRewards: number[]) => {
  return scaleRewards
    .map(scale => {
      const rewardPerEpoch = scale / rewardAmountDenominator;
      const yearlyCompoundedRate = (1 + rewardPerEpoch)**estimatedEpochsPerYear;
      return yearlyCompoundedRate - 1;
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
        text: data.map(d => `<i>Reward per epoch: ${d.scale * 100 / rewardAmountDenominator}%<br>Epoch: ${d.untilEpoch}</i>`),
        hoverinfo: 'all',
      },
    ],

    layout: {
      title: {
        text: 'Staking Rewards Schedule (time estimated from epoch interval)',
        font: {
          size: 20,
        },
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

  return <PlotlyChart label="Staking Rewards Schedule (time estimated from epoch interval)" chart={chart} fallbackSvg={FallbackSvg} />;
};

export default StakingRewardsChart;

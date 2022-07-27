import React, { ComponentType, SVGProps } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import plotlyPyDark from '@site/src/plotly-py-templates/plotly_dark.json';

import type { PlotlyDataLayoutConfig } from 'plotly.js-basic-dist';

const PlotlyChart = (props: {
    chart: PlotlyDataLayoutConfig,
    fallbackSvg: string,
    label: string,
  }) => {

  const { colorMode } = useColorMode();

  const chart: PlotlyDataLayoutConfig = {
    ...props.chart,
    layout: {
      template: colorMode === 'dark' ? plotlyPyDark : undefined,
      paper_bgcolor: colorMode === 'dark' ? '#1b1b1d' : undefined, // Match --ifm-background-color
      plot_bgcolor: colorMode === 'dark' ? '#1b1b1d' : undefined, // Match --ifm-background-color
      autosize: true,
      ...props.chart.layout,
    },
    config: {
      showLink: true,
      plotlyServerURL: 'https://chart-studio.plotly.com',
      ...props.chart.config,
    },
  };

  return (
    <div>
      <BrowserOnly
        fallback={
          <div>
            <img alt={props.label} style={{ width: '100%' }} className="text--center" src={props.fallbackSvg} />
            <p className="text--center"><i>Enable javascript to see interactive chart</i></p>
          </div>
        }
      >
        {() => {
          const PlotlyBasic: typeof import('plotly.js-basic-dist') = require('plotly.js-basic-dist');
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

export default PlotlyChart;

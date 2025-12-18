import React, {type ReactNode} from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import Translate from "@docusaurus/Translate";
import type {Props} from "@theme/Admonition/Type/Danger";
import AdmonitionLayout from "@theme/Admonition/Layout";
import clsx from "clsx";

const infimaClassName = 'alert alert--example';

const defaultProps = {
  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="transparent">
    <path d="M15.0002 12L6.62718 20.373C6.22935 20.7708 5.68979 20.9943 5.12718 20.9943C4.56457 20.9943 4.025 20.7708 3.62718 20.373C3.22936 19.9752 3.00586 19.4356 3.00586 18.873C3.00586 18.3104 3.22936 17.7708 3.62718 17.373L12.0002 9M18 15L22 11M21.5 11.5L19.586 9.58596C19.2109 9.21098 19.0001 8.70235 19 8.17196V6.99996L16.74 4.73996C15.6245 3.62515 14.115 2.99432 12.538 2.98396L9 2.95996L9.92 3.77996C10.5735 4.35935 11.0967 5.07066 11.4552 5.867C11.8137 6.66335 11.9994 7.52663 12 8.39996V9.99996L14 12H15.172C15.7024 12.0001 16.211 12.2109 16.586 12.586L18.5 14.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
    />
  </svg>,
  title: (
    <Translate
      id="theme.admonition.example"
      description="The default label used for the Example admonition (:::example)">
      example
    </Translate>
  ),
};

function ExampleAdmonition(props: Props): ReactNode {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  example: ExampleAdmonition,
};

export default AdmonitionTypes;
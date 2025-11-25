import React, {useRef, type ReactNode} from 'react';
import Details from '@theme-original/Details';
import type DetailsType from '@theme/Details';
import type {WrapperProps} from '@docusaurus/types';
import styles from './styles.module.css';
import clsx from 'clsx';

type Props = WrapperProps<typeof DetailsType>;

/**
 * Make collapsed Summary/Details searchable until it is fixed upstream
 * https://github.com/oasisprotocol/docs/issues/1568
 */
export default function DetailsWrapper(props: Props): ReactNode {
  return (
    <Details
      {...props}
      className={clsx(props.className, styles.makeSearchable)}
      onToggle={(e) => {
        // The browser natively toggles details element when a result is found
        // inside details. This workaround then toggles react component.
        const isToggledBySearchNotClick = e.newState === 'open' && e.currentTarget.getAttribute('data-collapsed') === 'true'
        if (isToggledBySearchNotClick) {
          e.currentTarget.querySelector('summary').click()
        }

        props.onToggle?.(e)
      }}
    />
  );
}

import cx from 'classnames';
import React from 'react';

import { settingsStore } from '../../store';

interface IProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const Loader = ({ size = 50, strokeWidth = 10, className }: IProps) => (
  <div
    data-id="loader"
    className={cx('flex items-center justify-center h-full w-full', className)}
  >
    <svg
      width={`${size}px`}
      height={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-rolling"
      style={{ background: 'none' }}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={settingsStore.isDark ? '#606f7b' : '#678bc2'}
        strokeWidth={strokeWidth}
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(41.8255 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

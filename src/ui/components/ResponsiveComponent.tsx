import React, { useLayoutEffect, useState } from 'react';
import { MediaQuery } from '../../enums/media-query';
import { isScreenLargerThanOrEqual } from '../../services/media-query-service';

interface IProps {
  threshold?: MediaQuery;
  aboveThreshold?: JSX.Element | JSX.Element[] | string;
  belowThreshold?: JSX.Element | JSX.Element[] | string;
}

export default function ResponsiveComponent({
  threshold = MediaQuery.TABLET_PORTRAIT,
  aboveThreshold,
  belowThreshold,
}: IProps) {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  if (isScreenLargerThanOrEqual(threshold)) {
    return <React.Fragment>{aboveThreshold}</React.Fragment>;
  }
  return <React.Fragment>{!!belowThreshold && belowThreshold}</React.Fragment>;
}

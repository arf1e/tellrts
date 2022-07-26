import React from 'react';
import LoadingIndicator from './LoadingIndicator';

export default LoadingIndicator;

export const conditionallyRenderComponent = (
  component: React.ReactNode,
  loading: boolean,
): React.ReactNode => {
  return loading ? LoadingIndicator : component;
};

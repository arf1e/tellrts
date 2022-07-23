import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from '../../utils/colors';
import CenterContainer from '../Container/CenterContainer';

const LoadingIndicator = () => {
  return (
    <CenterContainer>
      <ActivityIndicator size="large" color={colors.primary} />
    </CenterContainer>
  );
};

export default LoadingIndicator;

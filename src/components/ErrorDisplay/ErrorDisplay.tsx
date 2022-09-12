import React from 'react';
import {View, ViewProps} from 'react-native';
import Reanimated, {
  ComplexAnimationBuilder,
  FadeInDown,
  FadeOutDown,
} from 'react-native-reanimated';
import {BodyCopy} from '../Typography';
import styles from './ErrorDisplay.styles';

const AnimatedView = Reanimated.createAnimatedComponent(View);

interface Props extends ViewProps {
  error: string;
  entering?: ComplexAnimationBuilder;
  exiting?: ComplexAnimationBuilder;
}

const ErrorDisplay = ({error, ...rest}: Props) => {
  const viewStyles = [styles.errorContainer, rest.style];

  return (
    <AnimatedView
      {...rest}
      entering={rest.entering || FadeInDown.duration(230)}
      exiting={rest.exiting || FadeOutDown.duration(230)}
      style={viewStyles}>
      <BodyCopy style={styles.errorText}>{error}</BodyCopy>
    </AnimatedView>
  );
};

export default ErrorDisplay;

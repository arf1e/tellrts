import React from 'react';
import {View} from 'react-native';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SharedValue} from 'react-native-reanimated';
import {ImpressionIcon} from '../../assets/impressions';
import ImpressionsPreview from './ImpressionsPreview';
import styles from './RequestUserCard.styles';
import SuccessScore from './SuccessScore';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const RequestInfo = ({
  successRate,
  impressions,
  animatedValue,
}: {
  successRate: number;
  impressions: ImpressionIcon[];
  animatedValue: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: interpolate(animatedValue.value, [0, 1], [0, 40])},
      {scale: interpolate(animatedValue.value, [0, 1], [1, 0.9])},
    ],
    opacity: interpolate(animatedValue.value, [0, 1], [1, 0.5]),
  }));

  const containerStyle = [styles.requestInfoContainer, animatedStyle];
  return (
    <AnimatedView style={containerStyle}>
      <SuccessScore score={successRate} />
      <ImpressionsPreview impressions={impressions} />
    </AnimatedView>
  );
};

export default RequestInfo;

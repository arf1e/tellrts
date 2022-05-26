import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';

import styles from './Register.styles';

type Props = {
  isPassing: boolean;
  title: string;
};

const AnimatedDot = Reanimated.createAnimatedComponent(View);
const AnimatedText = Reanimated.createAnimatedComponent(Text);

const Fieldcheck = ({isPassing, title}: Props) => {
  const colorChangeShared = useSharedValue(0);

  const animatedDotStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        colorChangeShared.value,
        [0, 1],
        [colors.lightGray, colors.good],
      ),
    }),
    [colorChangeShared],
  );

  const animatedTextStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        colorChangeShared.value,
        [0, 1],
        [colors.gray, colors.good],
      ),
    }),
    [colorChangeShared],
  );

  const dotStyle = [styles.fieldcheckDot, animatedDotStyle];
  const textStyle = [styles.fieldcheckText, animatedTextStyle];

  useEffect(() => {
    if (isPassing) {
      colorChangeShared.value = withTiming(1, {
        duration: animationConstants.BUTTON_IN,
      });
    } else {
      colorChangeShared.value = withTiming(0, {
        duration: animationConstants.BUTTON_OUT,
      });
    }
  }, [isPassing, colorChangeShared]);

  return (
    <View style={styles.fieldcheckContainer}>
      <AnimatedDot style={dotStyle} />
      <AnimatedText style={textStyle}>{title}</AnimatedText>
    </View>
  );
};

export default Fieldcheck;

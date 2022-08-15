import {useDimensions} from '@react-native-community/hooks';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import styles from './Anket.styles';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const AnketProgress = ({progress}: {progress: number}) => {
  const fillShared = useSharedValue(progress);

  useEffect(() => {
    fillShared.value = withTiming(progress, {
      duration: animationConstants.BUTTON_IN,
    });
  }, [progress, fillShared]);

  const SCREEN_WIDTH = useDimensions().screen.width;

  const fillStyle = useAnimatedStyle(
    () => ({
      width: interpolate(fillShared.value, [0, 1], [0, SCREEN_WIDTH]),
    }),
    [fillShared],
  );

  const lineStyles = [styles.anketProgressLine, fillStyle];
  return (
    <View style={styles.anketProgressBackground}>
      <AnimatedView style={lineStyles} />
    </View>
  );
};

export default AnketProgress;

import React, {ReactNode, useEffect} from 'react';
import {View} from 'react-native';
import {BodyCopy, Subtitle} from '../../components/Typography';
import Reanimated, {
  FadeIn,
  FadeOut,
  interpolate,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {STEP, STEPS} from './AnketForm';
import styles from './Anket.styles';
import {useDimensions} from '@react-native-community/hooks';

const AnimatedView = Reanimated.createAnimatedComponent(View);

type Props = {
  title: STEP;
  heading: string;
  description: string;
  activeStep: STEP;
  children?: ReactNode;
};

const getActiveSharedValue = (title: STEP, activeStep: STEP): number => {
  const currentIndex = STEPS.indexOf(activeStep);
  const indexOfScreen = STEPS.indexOf(title);

  return indexOfScreen - currentIndex;
};

const AnketStep = ({
  title,
  heading,
  description,
  children,
  activeStep,
}: Props) => {
  const activeShared = useSharedValue(getActiveSharedValue(title, activeStep));

  const SCREEN_WIDTH = useDimensions().window.width;

  useEffect(() => {
    activeShared.value = withTiming(getActiveSharedValue(title, activeStep), {
      duration: 1000,
    });
  }, [activeStep, activeShared, title]);

  const isActive = useDerivedValue(() => {
    return activeShared.value === 0 ? true : false;
  }, [activeShared]);

  // const containerAnimatedStyle = useAnimatedStyle(
  //   () => ({
  //     position: isActive.value ? 'relative' : 'absolute',
  //     top: 0,
  //     transform: [
  //       {
  //         translateX: (SCREEN_WIDTH - 32) * activeShared.value,
  //       },
  //     ],
  //   }),
  //   [activeShared],
  // );

  const containerStyles = [styles.stepContainer];
  return (
    <AnimatedView style={containerStyles}>
      <View style={styles.stepInfo}>
        <Subtitle style={styles.stepTitle}>{heading}</Subtitle>
        <BodyCopy style={styles.stepDescription}>{description}</BodyCopy>
      </View>
      {children}
    </AnimatedView>
  );
};

export default AnketStep;

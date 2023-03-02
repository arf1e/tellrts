import React, {useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Reanimated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import styles from './PhotosBioScroller.styles';
import colors from '../../utils/colors';
import animationConstants from '../../utils/animationConstants';

const AnimatedIcon = Reanimated.createAnimatedComponent(Icon);
const AnimatedView = Reanimated.createAnimatedComponent(View);

const SliderElement = ({
  iconName,
  isActive,
}: {
  iconName: string;
  isActive: boolean;
}) => {
  const activeShared = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      activeShared.value = withTiming(1, {
        duration: animationConstants.BUTTON_IN / 2,
      });
    }

    if (!isActive) {
      activeShared.value = withTiming(0, {
        duration: animationConstants.BUTTON_OUT / 2,
      });
    }
  }, [isActive, activeShared]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        activeShared.value,
        [0, 1],
        [colors.secondary, colors.primary],
      ),
    }),
    [activeShared],
  );
  return (
    <View style={styles.sliderIconContainer}>
      <AnimatedIcon name={iconName} size={20} style={animatedStyle} />
    </View>
  );
};

const SliderIndicator = ({
  icons,
  activeSlide,
  shouldDisplay,
}: {
  icons: string[];
  activeSlide: number;
  shouldDisplay: SharedValue<number>;
}) => {
  const animatedStyles = useAnimatedStyle(
    () => ({
      position: 'absolute',
      right: 24,
      bottom: 8,
      opacity: interpolate(shouldDisplay.value, [0, 1], [0, 1]),
    }),
    [shouldDisplay],
  );

  const sliderContainerStyles = [
    styles.sliderIndicatorContainer,
    animatedStyles,
  ];
  return (
    <AnimatedView style={sliderContainerStyles}>
      {icons.map((elt, i) => (
        <SliderElement
          iconName={`${elt}-outline`}
          isActive={activeSlide === i}
          key={i}
        />
      ))}
    </AnimatedView>
  );
};

export default SliderIndicator;

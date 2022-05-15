import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';

const useColorAnimation = (color1: string, color2: string, prop: string) => {
  const isPressed = useSharedValue(0);
  const pressIn = () => {
    isPressed.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };
  const pressOut = () => {
    isPressed.value = withTiming(0, {duration: animationConstants.BUTTON_OUT});
  };
  const animatedStyle = useAnimatedStyle(
    () => ({
      [`${prop}`]: interpolateColor(isPressed.value, [0, 1], [color1, color2]),
      transform: [
        {
          scale: interpolate(
            isPressed.value,
            [0, 1],
            [1, animationConstants.SCALE_ON_PRESS],
          ),
        },
      ],
    }),
    [isPressed],
  );
  return {pressIn, pressOut, animatedStyle};
};

export default useColorAnimation;

import React, {SyntheticEvent} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import FieldStyles from './Field.styles';
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';

const ReanimatedTextInput = Reanimated.createAnimatedComponent(TextInput);

const Field = ({...rest}: TextInputProps) => {
  const isActiveSharedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        isActiveSharedValue.value,
        [0, 1],
        [colors.secondary, colors.primary],
      ),
    }),
    [isActiveSharedValue],
  );
  const inputStyle = [FieldStyles.field, rest.style, animatedStyle];

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onFocus) {
      rest.onFocus(e);
    }
    isActiveSharedValue.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onBlur) {
      rest.onBlur(e);
    }
    isActiveSharedValue.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };
  return (
    <ReanimatedTextInput
      {...rest}
      style={inputStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default Field;

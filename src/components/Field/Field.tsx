import React, {useEffect} from 'react';
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

interface FieldProps extends TextInputProps {
  isInvalid?: boolean;
}

const Field = ({isInvalid, ...rest}: FieldProps) => {
  const isActiveSharedValue = useSharedValue(isInvalid ? 2 : 0);
  const animatedStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        isActiveSharedValue.value,
        [0, 1, 2],
        [colors.secondary, colors.primary, colors.bad],
      ),
    }),
    [isActiveSharedValue],
  );
  const inputStyle = [FieldStyles.field, rest.style, animatedStyle];

  useEffect(() => {
    if (isInvalid) {
      isActiveSharedValue.value = withTiming(2, {
        duration: animationConstants.BUTTON_OUT,
      });
    }
  }, [isInvalid, isActiveSharedValue]);

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
    isActiveSharedValue.value = withTiming(isInvalid ? 2 : 0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };
  return (
    <ReanimatedTextInput
      {...rest}
      testID="Field.TextInput"
      style={inputStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default Field;

import React from 'react';
import Field from './Field';
import styles from './Field.styles';
import {StyleProp, Text, TextInputProps, View} from 'react-native';
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import ErrorDisplay from '../ErrorDisplay';

const FieldTitle = Reanimated.createAnimatedComponent(Text);

interface Props extends TextInputProps {
  title?: string;
  error?: string;
  containerStyles?: StyleProp<View>;
}

const FormField = ({title, error, containerStyles, ...rest}: Props) => {
  const focusShared = useSharedValue(0);

  const onFocus = () => {
    focusShared.value = withTiming(1, {duration: animationConstants.BUTTON_IN});
  };

  const onBlur = () => {
    focusShared.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  const titleAnimatedStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        focusShared.value,
        [0, 1],
        [colors.lightGray, colors.gray],
      ),
    }),
    [focusShared.value],
  );

  return (
    <View style={[styles.formFieldContainer, containerStyles]}>
      {title && (
        <FieldTitle style={[styles.formFieldTitle, titleAnimatedStyle]}>
          {title}
        </FieldTitle>
      )}
      <Field {...rest} onFocus={onFocus} onBlur={onBlur} />
      {Boolean(error) && (
        <ErrorDisplay style={styles.formFieldError} error={error} />
      )}
    </View>
  );
};

export default FormField;

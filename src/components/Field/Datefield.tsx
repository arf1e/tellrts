import React, {useState} from 'react';
import {TextInputProps} from 'react-native';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TextInputMask from 'react-native-text-input-mask';

import styles from './Field.styles';

interface Props extends TextInputProps {
  mask: string;
}

const Datefield = ({mask, onChangeText, ...rest}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const inputStyle = [styles.field, isActive && styles.fieldActive, rest.style];

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <TextInputMask
      mask={mask}
      keyboardType="number-pad"
      style={inputStyle}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
};

export default Datefield;

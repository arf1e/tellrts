import React from 'react';
import {Pressable} from 'react-native';
import Reanimated from 'react-native-reanimated';
import colors from '../../utils/colors';
import {BodyCopy} from '../Typography';
import ButtonsStyles from './Buttons.styles';
import ButtonProps from './Buttons.types';
import useColorAnimation from './useColorAnimation';

const MyPressable = Reanimated.createAnimatedComponent(Pressable);
const PrimaryButton = ({title, ...rest}: ButtonProps) => {
  const {pressIn, pressOut, animatedStyle} = useColorAnimation(
    colors.primary,
    colors.unsaturatedPrimary,
    'backgroundColor',
  );
  const styles = [
    ButtonsStyles.skeleton,
    ButtonsStyles.primary,
    animatedStyle,
    rest.disabled && ButtonsStyles.disabled,
    rest.style,
  ];

  return (
    <MyPressable
      {...rest}
      style={styles}
      onPressOut={pressOut}
      onPressIn={pressIn}>
      <BodyCopy style={ButtonsStyles.btnText}>{title}</BodyCopy>
      {rest.children}
    </MyPressable>
  );
};

export default PrimaryButton;

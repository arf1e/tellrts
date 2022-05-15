import React from 'react';
import TypographyInterface from './Typography.types';
import {Text} from 'react-native';
import styles from '../Typography/Typography.styles';

export default ({children, style, ...rest}: TypographyInterface) => {
  return (
    <Text style={[styles.subtitle, style]} {...rest}>
      {children}
    </Text>
  );
};

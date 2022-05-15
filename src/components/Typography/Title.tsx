import {Text} from 'react-native';
import React from 'react';
import TypographyInterface from './Typography.types';
import styles from './Typography.styles';

export default ({children, style, ...rest}: TypographyInterface) => {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
};

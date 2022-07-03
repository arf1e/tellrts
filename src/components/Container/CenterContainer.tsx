import React from 'react';
import {View, ViewProps} from 'react-native';
import styles from './Container.styles';

export default (props: ViewProps) => {
  return <View style={styles.centerContainer}>{props.children}</View>;
};

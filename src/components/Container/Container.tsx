import React from 'react';
import {View, ViewProps} from 'react-native';

import styles from './Container.styles';

export default ({...rest}: ViewProps) => (
  <View style={[styles.container, rest.style]}>{rest.children}</View>
);

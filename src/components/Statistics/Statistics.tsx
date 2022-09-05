import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import ActionHeader from '../ActionHeader';
import {STATISTICS} from '../Navigation/ProfileNavigator';
import styles from './Statistics.styles';

export default () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ActionHeader
        title="Statistics"
        linkTitle="More"
        // @ts-ignore
        onLinkPress={() => navigation.navigate(STATISTICS)}
      />
    </View>
  );
};

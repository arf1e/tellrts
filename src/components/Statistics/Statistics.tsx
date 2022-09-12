import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, View} from 'react-native';
import {getImpressionImage} from '../../assets/impressions';
import ActionHeader from '../ActionHeader';
import {STATISTICS} from '../Navigation/ProfileNavigator';
import {BodyCopy} from '../Typography';
import StatisticsCard from './Statistics.Card';
import StatisticsDetails from './Statistics.Details';
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
      <StatisticsDetails />
    </View>
  );
};

import {useQuery} from '@apollo/client';
import React from 'react';
import {Image, View} from 'react-native';
import {getImpressionImage} from '../../assets/impressions';
import {SHOULD_GET_STATISTICS_QUERY} from '../../screens/Profile/Profile.graphql';
import Container from '../Container';
import LoadingIndicator from '../LoadingIndicator';
import {BodyCopy} from '../Typography';
import StatisticsCard from './Statistics.Card';
import SImpressions from './Statistics.Impressions';
import InteractionsCount from './Statistics.InteractionsCount';
import styles from './Statistics.styles';
import AverageSuccessRate from './Statistics.SuccessRate';

const StatisticsDetails = () => {
  return (
    <Container>
      <View style={styles.cardsContainer}>
        <SImpressions />
        <InteractionsCount />
        <AverageSuccessRate />
      </View>
    </Container>
  );
};

export default StatisticsDetails;

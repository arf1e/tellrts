import React from 'react';
import {Image, View} from 'react-native';
import {getImpressionImage} from '../../assets/impressions';
import Container from '../Container';
import {BodyCopy} from '../Typography';
import StatisticsCard from './Statistics.Card';
import styles from './Statistics.styles';

const StatisticsDetails = () => {
  return (
    <Container>
      <View style={styles.cardsContainer}>
        <StatisticsCard title="Cute" description="Most popular impression">
          <Image
            source={getImpressionImage('cute')}
            style={{width: 42, height: 42}}
          />
        </StatisticsCard>
        <StatisticsCard title="Interactions" description="In the last month">
          <BodyCopy style={styles.cardValue}>77</BodyCopy>
        </StatisticsCard>
        <StatisticsCard title="Success Rate" description="In guessing answers">
          <BodyCopy style={styles.cardValue}>25%</BodyCopy>
        </StatisticsCard>
      </View>
    </Container>
  );
};

export default StatisticsDetails;

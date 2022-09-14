import {useQuery} from '@apollo/client';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {GET_AVERAGE_SUCCESS_RATE_QUERY} from '../../screens/Profile/Profile.graphql';
import {BodyCopy} from '../Typography';
import StatisticsCard from './Statistics.Card';
import styles from './Statistics.styles';

const AverageSuccessRate = () => {
  const {loading, data} = useQuery<{getAverageSuccessRate: number}>(
    GET_AVERAGE_SUCCESS_RATE_QUERY,
  );

  const {t} = useTranslation();

  if (!data?.getAverageSuccessRate) {
    return <></>;
  }

  return (
    <StatisticsCard
      loading={loading}
      title={t('app.profile.successRate')}
      description={t('app.profile.successRateDescription')}>
      <BodyCopy
        style={
          styles.cardValue
        }>{`${data?.getAverageSuccessRate.toString()}%`}</BodyCopy>
    </StatisticsCard>
  );
};

export default AverageSuccessRate;

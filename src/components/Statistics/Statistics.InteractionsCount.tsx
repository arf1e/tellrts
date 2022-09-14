import {useQuery} from '@apollo/client';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {GET_LAST_MONTH_INTERACTIONS_COUNT_QUERY} from '../../screens/Profile/Profile.graphql';
import {BodyCopy} from '../Typography';
import StatisticsCard from './Statistics.Card';
import styles from './Statistics.styles';

const InteractionsCount = () => {
  const {loading, data} = useQuery<{getLastMonthInteractionsCount: number}>(
    GET_LAST_MONTH_INTERACTIONS_COUNT_QUERY,
  );
  const {t} = useTranslation();

  if (!data) {
    return <></>;
  }

  return (
    <StatisticsCard
      title={t('app.profile.interactionTitle', {
        count: data.getLastMonthInteractionsCount,
      })}
      loading={loading}
      description={t('app.profile.interactionsDescription')}>
      <BodyCopy style={styles.cardValue}>
        {data.getLastMonthInteractionsCount.toString()}
      </BodyCopy>
    </StatisticsCard>
  );
};

export default InteractionsCount;

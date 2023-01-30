import {useQuery} from '@apollo/client';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {SHOULD_GET_STATISTICS_QUERY} from '../../screens/Profile/Profile.graphql';
import ActionHeader from '../ActionHeader';
import LoadingIndicator from '../LoadingIndicator';
import StatisticsDetails from './Statistics.Details';
import styles from './Statistics.styles';

export default () => {
  const {t} = useTranslation();
  const {data, loading} = useQuery<{shouldGetStatistics: boolean}>(
    SHOULD_GET_STATISTICS_QUERY,
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data?.shouldGetStatistics) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <ActionHeader
        title={t('app.profile.statistics')}
        // linkTitle="More"
        // @ts-ignore
        // onLinkPress={() => navigation.navigate(STATISTICS)}
      />
      <StatisticsDetails />
    </View>
  );
};

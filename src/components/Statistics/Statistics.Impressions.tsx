import {useQuery} from '@apollo/client';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {
  getImpressionImage,
  getImpressionTitle,
  ImpressionIcon,
} from '../../assets/impressions';
import {GET_MOST_POPULAR_IMPRESSION_QUERY} from '../../screens/Profile/Profile.graphql';
import StatisticsCard from './Statistics.Card';

const SImpressions = () => {
  const {loading, data} = useQuery<{
    getMostPopularImpression: {
      impression: ImpressionIcon;
      sex: Boolean;
    };
  }>(GET_MOST_POPULAR_IMPRESSION_QUERY);
  const {t} = useTranslation();

  if (!data?.getMostPopularImpression) {
    return <></>;
  }

  return (
    <StatisticsCard
      loading={loading}
      title={t(
        getImpressionTitle(
          data?.getMostPopularImpression.impression,
          data.getMostPopularImpression.sex ? 'male' : 'female',
        ),
      )}
      description={t('app.profile.displayImpression')}>
      <Image
        source={getImpressionImage(data?.getMostPopularImpression.impression)}
        style={{width: 42, height: 42}}
      />
    </StatisticsCard>
  );
};

export default SImpressions;

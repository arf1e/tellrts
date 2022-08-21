import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import {
  getImpressionImage,
  getImpressionTitle,
  ImpressionIcon,
} from '../../assets/impressions';
import {BodyCopy} from '../../components/Typography';
import styles from './RequestResult.styles';
import ReviewSection from './ReviewSection';

type Props = {
  impressions: ImpressionIcon[];
};

const ImpressionCard = ({impression}: {impression: ImpressionIcon}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.impressionCardContainer}>
      <Image
        source={getImpressionImage(impression)}
        style={styles.impressionCardImage}
      />
      <BodyCopy style={styles.impressionCardTitle}>
        {t(getImpressionTitle(impression, 'female'))}
      </BodyCopy>
    </View>
  );
};

const ImpressionsResult = ({impressions}: Props) => {
  return (
    <ReviewSection title="Impressions">
      {impressions.map(impression => (
        <ImpressionCard key={impression} impression={impression} />
      ))}
    </ReviewSection>
  );
};

export default ImpressionsResult;

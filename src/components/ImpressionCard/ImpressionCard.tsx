import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import styles from './ImpressionCard.styles';
import {
  getImpressionImage,
  getImpressionTitle,
  ImpressionIcon,
} from '../../assets/impressions';
import {BodyCopy} from '../Typography';

const ImpressionCard = ({
  impression,
  sex,
}: {
  impression: ImpressionIcon;
  sex: 'female' | 'male';
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.impressionCardContainer}>
      <Image
        source={getImpressionImage(impression)}
        style={styles.impressionCardImage}
      />
      <BodyCopy style={styles.impressionCardTitle}>
        {t(getImpressionTitle(impression, sex))}
      </BodyCopy>
    </View>
  );
};

export default ImpressionCard;

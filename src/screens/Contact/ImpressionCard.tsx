import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import {getImpressionImage, ImpressionIcon} from '../../assets/impressions';
import styles from './Contact.styles';
import ContactCard from './ContactCard';

type Props = {
  impressions: ImpressionIcon[];
};

const ImpressionsCard = ({impressions}: Props) => {
  const {t} = useTranslation();
  return (
    <ContactCard title={t('app.contact.impressionsTitle')}>
      <View style={styles.impressionsContainer}>
        {impressions.map(impression => (
          <Image
            source={getImpressionImage(impression)}
            key={impression}
            style={styles.impressionEmoji}
          />
        ))}
      </View>
    </ContactCard>
  );
};

export default ImpressionsCard;

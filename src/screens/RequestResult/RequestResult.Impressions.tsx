import React from 'react';
import {useTranslation} from 'react-i18next';
import {ImpressionIcon} from '../../assets/impressions';
import ImpressionCard from '../../components/ImpressionCard';
import ReviewSection from './ReviewSection';

type Props = {
  impressions: ImpressionIcon[];
  sex: 'female' | 'male';
};

const ImpressionsResult = ({impressions, sex}: Props) => {
  const {t} = useTranslation();
  return (
    <ReviewSection title={t('app.contact.impressionsTitle')}>
      {impressions.map(impression => (
        <ImpressionCard key={impression} sex={sex} impression={impression} />
      ))}
    </ReviewSection>
  );
};

export default ImpressionsResult;

import React from 'react';
import {ImpressionIcon} from '../../assets/impressions';
import ImpressionCard from '../../components/ImpressionCard';
import ReviewSection from './ReviewSection';

type Props = {
  impressions: ImpressionIcon[];
  sex: 'female' | 'male';
};

const ImpressionsResult = ({impressions, sex}: Props) => {
  return (
    <ReviewSection title="Impressions">
      {impressions.map(impression => (
        <ImpressionCard key={impression} sex={sex} impression={impression} />
      ))}
    </ReviewSection>
  );
};

export default ImpressionsResult;

import React from 'react';
import {useTranslation} from 'react-i18next';
import {Title} from '../../components/Typography';
import ReviewSection from './ReviewSection';

type Props = {
  successRate: number;
};

const SuccessRateResult = ({successRate}: Props) => {
  const {t} = useTranslation();
  return (
    <ReviewSection title={t('app.contact.successRateTitle')}>
      <Title>{`${successRate}%`}</Title>
      <></>
    </ReviewSection>
  );
};

export default SuccessRateResult;

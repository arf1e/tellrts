import React from 'react';
import ContactCard from './ContactCard';
import styles from './Contact.styles';
import {BodyCopy} from '../../components/Typography';
import {useTranslation} from 'react-i18next';

type Props = {
  successRate: number;
};

const SuccessRateCard = ({successRate}: Props) => {
  const {t} = useTranslation();
  return (
    <ContactCard title={t('app.contact.successRateTitle')}>
      <BodyCopy style={styles.successRate}>{`${successRate}%`}</BodyCopy>
    </ContactCard>
  );
};

export default SuccessRateCard;

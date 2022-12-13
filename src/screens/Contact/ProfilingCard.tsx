import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import styles from './Contact.styles';
import ContactCard from './ContactCard';

type TTake = {
  title: string;
  answer: string;
  isCorrect: boolean;
};

type Props = {
  takes: TTake[];
};

const Take = ({take}: {take: TTake}) => {
  const {title, answer, isCorrect} = take;

  const answerStyles = [
    styles.takeAnswer,
    isCorrect ? styles.takeAnswerCorrect : styles.takeAnswerIncorrect,
  ];

  return (
    <View style={styles.takeContainer}>
      <BodyCopy style={styles.takeTitle}>{title}</BodyCopy>
      <BodyCopy style={answerStyles}>{answer}</BodyCopy>
    </View>
  );
};

const ProfilingCard = ({takes}: Props) => {
  const {t} = useTranslation();
  return (
    <ContactCard title={t('app.contact.profilingTitle')}>
      <View style={styles.profilingContainer}>
        {takes.map(take => (
          <Take take={take} key={take.title} />
        ))}
      </View>
    </ContactCard>
  );
};

export default ProfilingCard;

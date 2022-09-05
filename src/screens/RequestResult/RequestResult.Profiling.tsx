import React from 'react';
import ReviewSection from './ReviewSection';
import styles from './RequestResult.styles';
import {View} from 'react-native';
import {BodyCopy} from '../../components/Typography';

export type Assumption = {
  title: string;
  answer: string;
  isCorrect: boolean;
};

type Props = {
  takes: Assumption[];
};

const ProfilingCard = ({take}: {take: Assumption}) => {
  const answerStyles = [
    styles.guessAnswer,
    take.isCorrect ? styles.guessAnswerGood : styles.guessAnswerBad,
  ];
  return (
    <View style={styles.profilingCardContainer}>
      <BodyCopy style={styles.guessQuestion}>{take.title}</BodyCopy>
      <BodyCopy style={answerStyles}>{take.answer}</BodyCopy>
    </View>
  );
};

const ProfilingResult = ({takes}: Props) => {
  return (
    <ReviewSection title="Profiling">
      {takes.map(take => (
        <ProfilingCard key={take.title} take={take} />
      ))}
    </ReviewSection>
  );
};

export default ProfilingResult;

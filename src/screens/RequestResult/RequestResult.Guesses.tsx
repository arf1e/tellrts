import React from 'react';
import {View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import styles from './RequestResult.styles';
import ReviewSection from './ReviewSection';

type Guess = {
  id: number;
  question: {
    id: number;
    text: string;
  };
  answer: string;
  isCorrect: boolean;
};

type Props = {
  guesses: Guess[];
};

const GuessCard = ({guess}: {guess: Guess}) => {
  const answerStyles = [
    styles.guessAnswer,
    guess.isCorrect ? styles.guessAnswerGood : styles.guessAnswerBad,
  ];
  return (
    <View style={styles.guessContainer}>
      <BodyCopy style={styles.guessQuestion}>{guess.question.text}</BodyCopy>
      <BodyCopy style={answerStyles}>{guess.answer}</BodyCopy>
    </View>
  );
};

const GuessesResult = ({guesses}: Props) => {
  return (
    <ReviewSection title="Questions">
      {guesses.map(guess => (
        <GuessCard key={guess.id} guess={guess} />
      ))}
    </ReviewSection>
  );
};

export default GuessesResult;

import React from 'react';
import {useTranslation} from 'react-i18next';
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
  correct: string;
};

type Props = {
  guesses: Guess[];
  showAnswers?: boolean;
};

const GuessCard = ({
  guess,
  shouldShowAnswer = false,
}: {
  guess: Guess;
  shouldShowAnswer: boolean;
}) => {
  const willRenderCorrectAnswers = shouldShowAnswer && !guess.isCorrect;
  const {t} = useTranslation();
  const answerStyles = [
    styles.guessAnswer,
    guess.isCorrect ? styles.guessAnswerGood : styles.guessAnswerBad,
  ];
  return (
    <View style={styles.guessContainer}>
      <BodyCopy style={styles.guessQuestion}>{guess.question.text}</BodyCopy>
      <BodyCopy style={answerStyles}>{guess.answer}</BodyCopy>
      {guess.isCorrect && (
        <BodyCopy style={styles.approvedAnswer}>Это правильный ответ</BodyCopy>
      )}
      {willRenderCorrectAnswers && (
        <>
          <BodyCopy style={styles.guessCorrectAnswerTitle}>
            {t('app.contact.correctAnswerTitle')}
          </BodyCopy>
          <View style={styles.correctAnswerContainer}>
            <BodyCopy style={styles.correctAnswer}>{guess.correct}</BodyCopy>
          </View>
        </>
      )}
    </View>
  );
};

const GuessesResult = ({guesses, showAnswers = false}: Props) => {
  const {t} = useTranslation();
  return (
    <ReviewSection title={t('app.contact.guessesTitle')}>
      {guesses.map(guess => (
        <GuessCard
          shouldShowAnswer={showAnswers}
          key={guess.id}
          guess={guess}
        />
      ))}
    </ReviewSection>
  );
};

export default GuessesResult;

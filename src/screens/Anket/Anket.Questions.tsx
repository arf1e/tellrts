import React from 'react';
import {useTranslation} from 'react-i18next';
import {Anket} from '../Search/Search.graphql';
import AnketLine from './Anket.Line';
import {getCurrentGuess, updateOrCreateGuess} from './Anket.utils';
import {ANKET_FORMIK_PROPS} from './AnketForm';
import AnketStep from './AnketStep';

type Props = {
  formNavigation: any;
  anket: Anket;
  formikProps: ANKET_FORMIK_PROPS;
};

const checkIfGuessesPass = (formikProps: ANKET_FORMIK_PROPS, anket: Anket) => {
  const asMuschGuessesAsNeeded =
    formikProps.values.guesses.length === anket.lines.length;
  const everyLineHasAGuess =
    // @ts-ignore
    formikProps.values.guesses.filter(guess => !guess.answer).length === 0;
  return asMuschGuessesAsNeeded && everyLineHasAGuess;
};

const QuestionsStep = ({formNavigation, anket, formikProps}: Props) => {
  const {t} = useTranslation();
  return (
    <AnketStep
      navigation={formNavigation}
      heading={t('app.anket.questions.title')}
      buttonDisabled={!checkIfGuessesPass(formikProps, anket)}
      description={t('app.anket.questions.description')}>
      {anket.lines.map(line => (
        <AnketLine
          question={line.question}
          key={`${line.question.id}-${line.question.category.id}`}
          answers={line.answers}
          chooseAnswer={answer =>
            formikProps.setFieldValue(
              'guesses',
              updateOrCreateGuess(
                formikProps.values.guesses,
                answer.text,
                line.question.id,
              ),
            )
          }
          chosenAnswer={getCurrentGuess(
            formikProps.values.guesses,
            line.question.id,
          )}
        />
      ))}
    </AnketStep>
  );
};

export default QuestionsStep;

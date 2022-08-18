import React from 'react';
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

const QuestionsStep = ({formNavigation, anket, formikProps}: Props) => {
  return (
    <AnketStep
      navigation={formNavigation}
      heading="Вопросы"
      description={'Описание этого шага \nв две строчки'}>
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

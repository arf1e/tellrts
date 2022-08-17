import {Formik, FormikProps} from 'formik';
import React, {useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BodyCopy} from '../../components/Typography';
import {toggleArrayElement} from '../../utils/arrays';
import {AnketState, clearAnket} from '../../utils/slices/anketSlice';
import {Anket} from '../Search/Search.graphql';
import AnketLine from './Anket.Line';
import styles from './Anket.styles';
import {
  BRIEFING,
  generateAnketInitialValues,
  IMPRESSIONS,
  QUESTIONS,
  STEP,
  STEPS,
} from './Anket.types';
import AnketProgress from './AnketProgress';
import AnketStep from './AnketStep';
import ImpressionPicker from './Impression';
import ProfileLine from './ProfileLine';

type MaybeHasValue = string | null;

const checkIfFieldsHaveValues = (...fields: MaybeHasValue[]) => {
  const fieldsWithValues = fields.filter(elt => Boolean(elt));
  return fieldsWithValues.length === fields.length;
};

const AnketForm = () => {
  const [activeStep, setActiveStep] = useState<STEP>(IMPRESSIONS);
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  if (!anket) {
    return null;
  }
  const dispatch = useDispatch();
  const initialValues = anket && generateAnketInitialValues(anket);

  const getCurrentStepIndex = () => STEPS.indexOf(activeStep);

  const getCurrentProgress = () => {
    const totalSteps = STEPS.length;
    const currentStep = getCurrentStepIndex();
    const progress = Math.fround((currentStep + 1) / totalSteps);
    return progress;
  };

  const setNextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex + 1 < STEPS.length) {
      setActiveStep(STEPS[currentIndex + 1]);
    }
  };

  const setPreviousStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex - 1 > -1) {
      setActiveStep(STEPS[currentIndex - 1]);
    }
  };

  const handleQuitForm = () => {
    Alert.alert(
      'Отменить заполнение анкеты',
      'Пожалуйста, подтвердите это действие. \n В случае выхода весь прогресс будет сброшен, а список пользователей на предыдущем экране обновится.',
      [
        {
          text: 'Отменить заполнение',
          style: 'destructive',
          onPress: () => dispatch(clearAnket()),
        },
        {text: 'Продолжить заполнение', style: 'cancel', onPress: () => null},
      ],
    );
  };

  const formNavigation = {
    nextStep: setNextStep,
    previousStep: setPreviousStep,
  };

  const renderStep = (
    item: STEP,
    formikProps: FormikProps<{
      userId: number;
      name: string;
      impressions: never[];
      guesses: never[];
    }>,
  ) => {
    const elementMapper = {
      [IMPRESSIONS]: (
        <AnketStep
          navigation={{
            nextStep: setNextStep,
            previousStep: handleQuitForm,
            previousStepTitle: 'Выйти',
          }}
          buttonDisabled={formikProps.values.impressions.length < 1}
          key={item}
          heading="Первое впечатление"
          description={`Начнём с комплиментов! ${'\n'}Допустимы любые комбинации.`}>
          <ImpressionPicker
            activeImpressions={formikProps.values.impressions}
            onPressImpression={impression =>
              formikProps.setFieldValue(
                'impressions',
                toggleArrayElement(formikProps.values.impressions, impression),
              )
            }
          />
        </AnketStep>
      ),
      [BRIEFING]: (
        <AnketStep
          navigation={formNavigation}
          heading="Профайлинг"
          key={item}
          buttonDisabled={!checkIfFieldsHaveValues(formikProps.values.name)}
          description={`Тут нет ничего общего с профайлингом. ${'\n'}Просто слово красивое.`}>
          <>
            <ProfileLine
              question="Тебя зовут"
              answer={formikProps.values.name}
              options={anket.names}
              handleChoose={name => formikProps.setFieldValue('name', name)}
            />
          </>
        </AnketStep>
      ),
      [QUESTIONS]: (
        <AnketStep
          navigation={formNavigation}
          key={item}
          heading="Вопросы"
          description={'Описание этого шага \nв две строчки'}>
          {anket.lines.map((line, i) => (
            <AnketLine
              question={line.question}
              answers={line.answers}
              chosenAnswer={formikProps.values.guesses[i].answer}
              chooseAnswer={(answer: string) =>
                formikProps.setFieldValue(`guesses[${i}]`, {
                  questionId: line.question.id,
                  answer: answer,
                })
              }
            />
          ))}
        </AnketStep>
      ),
    };

    return activeStep === item && elementMapper[item];
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.warn}>
      {formikProps => (
        <View style={styles.anketMainContainer}>
          <AnketProgress progress={getCurrentProgress()} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {STEPS.map(step => renderStep(step, formikProps))}
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default AnketForm;

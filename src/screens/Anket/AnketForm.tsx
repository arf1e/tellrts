import {Formik, FormikProps} from 'formik';
import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AnketState, clearAnket} from '../../utils/slices/anketSlice';
import Impressions from './Anket.Impressions';
import Profiling from './Anket.Profiling';
import QuestionsStep from './Anket.Questions';
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

export type ANKET_FORMIK_PROPS = FormikProps<{
  userId: number;
  name: string;
  impressions: never[];
  guesses: never[];
}>;

const AnketForm = () => {
  const [activeStep, setActiveStep] = useState<STEP>(IMPRESSIONS);
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  const dispatch = useDispatch();
  if (!anket) {
    return null;
  }
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
    setNextStep: setNextStep,
    setPreviousStep: setPreviousStep,
  };

  const renderStep = (item: STEP, formikProps: ANKET_FORMIK_PROPS) => {
    const elementMapper = {
      [IMPRESSIONS]: (
        <Impressions
          key={IMPRESSIONS}
          setNextStep={formNavigation.setNextStep}
          handleQuitForm={handleQuitForm}
          formikProps={formikProps}
        />
      ),
      [BRIEFING]: (
        <Profiling
          key={BRIEFING}
          formNavigation={formNavigation}
          formikProps={formikProps}
          anket={anket}
        />
      ),
      [QUESTIONS]: (
        <QuestionsStep
          key={QUESTIONS}
          formNavigation={formNavigation}
          formikProps={formikProps}
          anket={anket}
        />
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

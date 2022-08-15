import {Formik, FormikProps} from 'formik';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BodyCopy} from '../../components/Typography';
import {toggleArrayElement} from '../../utils/arrays';
import {AnketState} from '../../utils/slices/anketSlice';
import {Anket} from '../Search/Search.graphql';
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

const AnketForm = () => {
  const [activeStep, setActiveStep] = useState<STEP>(IMPRESSIONS);
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  if (!anket) {
    return null;
  }
  // const dispatch = useDispatch();
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
          navigation={formNavigation}
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
          description={`Тут нет ничего общего с профайлингом. ${'\n'}Просто слово красивое.`}>
          <BodyCopy>
            Проснувшись однажды утром после беспокойного сна, Грегор Замза
            обнаружил, что он у себя в постели превратился в страшное насекомое.
            Лежа на панцирнотвердой спине, он видел, стоило ему приподнять
            голову, свой коричневый, выпуклый, разделенный дугообразными
            чешуйками живот, на верхушке которого еле держалось готовое вот-вот
            окончательно сползти одеяло. Его многочисленные, убого тонкие по
            сравнению с Проснувшись однажды утром после беспокойного сна, Грегор
            Замза обнаружил, что он у себя в постели превратился в страшное
            насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему
            приподнять голову, свой коричневый, выпуклый, разделенный
            дугообразными чешуйками живот, на верхушке которого еле держалось
            готовое вот-вот окончательно сползти одеяло. Его многочисленные,
            убого тонкие по сравнению с
          </BodyCopy>
        </AnketStep>
      ),
      [QUESTIONS]: (
        <AnketStep
          navigation={formNavigation}
          key={item}
          heading="Вопросы"
          description={`Тут нет ничего общего с профайлингом. ${'\n'}Просто слово красивое.`}>
          <BodyCopy>privet)</BodyCopy>
        </AnketStep>
      ),
    };

    return activeStep === item && elementMapper[item];
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.warn}>
      {formikProps => (
        <>
          <View style={styles.anketMainContainer}>
            <AnketProgress progress={getCurrentProgress()} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {STEPS.map(step => renderStep(step, formikProps))}
            </ScrollView>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AnketForm;

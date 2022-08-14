import {useDimensions} from '@react-native-community/hooks';
import {ErrorMessage, Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import {BodyCopy} from '../../components/Typography';
import {AnketState} from '../../utils/slices/anketSlice';
import {Anket} from '../Search/Search.graphql';
import styles from './Anket.styles';
import AnketStep from './AnketStep';
import ImpressionPicker from './Impression';

// Steps order
const IMPRESSIONS = 'impressions';
const BRIEFING = 'briefing';
const QUESTIONS = 'questions';

export type STEP = typeof IMPRESSIONS | typeof BRIEFING | typeof QUESTIONS;
export const STEPS: STEP[] = [IMPRESSIONS, BRIEFING, QUESTIONS];

const generateAnketInitialValues = (anket: Anket) => {
  return {
    userId: anket.id,
    name: '',
    impressions: [],
    guesses: [],
  };
};

const toggleArrayElement = (arr: any[], element: any): any[] => {
  const arrayContainsElement = arr.includes(element);
  if (arrayContainsElement) {
    return arr.filter(elt => elt !== element);
  }

  return [...arr, element];
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

  return (
    <Formik initialValues={initialValues} onSubmit={console.warn}>
      {formikProps => (
        <ScrollView
          style={styles.anketMainContainer}
          contentContainerStyle={{flexGrow: 1}}>
          <BodyCopy>{JSON.stringify(formikProps.values)}</BodyCopy>
          <View style={styles.stepsContainer}>
            {activeStep === IMPRESSIONS && (
              <AnketStep
                title={IMPRESSIONS}
                activeStep={activeStep}
                heading="Первое впечатление"
                description={`Начнём с комплиментов! ${'\n'}Допустимы любые комбинации.`}>
                <ImpressionPicker
                  activeImpressions={formikProps.values.impressions}
                  onPressImpression={impression =>
                    formikProps.setFieldValue(
                      'impressions',
                      toggleArrayElement(
                        formikProps.values.impressions,
                        impression,
                      ),
                    )
                  }
                />
              </AnketStep>
            )}
            {activeStep === BRIEFING && (
              <AnketStep
                title={BRIEFING}
                activeStep={activeStep}
                heading="Профайлинг"
                description={`Тут нет ничего общего с профайлингом. ${'\n'}Просто слово красивое.`}>
                <BodyCopy>
                  Проснувшись однажды утром после беспокойного сна, Грегор Замза
                  обнаружил, что он у себя в постели превратился в страшное
                  насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему
                  приподнять голову, свой коричневый, выпуклый, разделенный
                  дугообразными чешуйками живот, на верхушке которого еле
                  держалось готовое вот-вот окончательно сползти одеяло. Его
                  многочисленные, убого тонкие по сравнению с Проснувшись
                  однажды утром после беспокойного сна, Грегор Замза обнаружил,
                  что он у себя в постели превратился в страшное насекомое. Лежа
                  на панцирнотвердой спине, он видел, стоило ему приподнять
                  голову, свой коричневый, выпуклый, разделенный дугообразными
                  чешуйками живот, на верхушке которого еле держалось готовое
                  вот-вот окончательно сползти одеяло. Его многочисленные, убого
                  тонкие по сравнению с
                </BodyCopy>
              </AnketStep>
            )}
            {activeStep === QUESTIONS && (
              <AnketStep
                title={QUESTIONS}
                activeStep={activeStep}
                heading="Вопросы"
                description={`Тут нет ничего общего с профайлингом. ${'\n'}Просто слово красивое.`}>
                <BodyCopy>privet)</BodyCopy>
              </AnketStep>
            )}
          </View>
          <PrimaryButton title="next" onPress={setNextStep} />
          <SecondaryButton title="prev" onPress={setPreviousStep} />
        </ScrollView>
      )}
    </Formik>
  );
};

export default AnketForm;

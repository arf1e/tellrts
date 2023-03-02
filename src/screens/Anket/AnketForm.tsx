import {useMutation} from '@apollo/client';
import {Formik, FormikProps} from 'formik';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AnketHeader from '../../components/AnketHeader';
import Reanimated from 'react-native-reanimated';
import {AnketState, clearAnket} from '../../utils/slices/anketSlice';
import {setRequestResult} from '../../utils/slices/requestResultSlice';
import {
  setRequestStateIdle,
  setRequestStateReviewing,
} from '../../utils/slices/requestStateSlice';
import errorCatcher, {showSuccessToast} from '../../utils/toasts';
import {SendRequestResponse, SEND_REQUEST_MUTATION} from './Anket.graphql';
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
import AnketLoading from './AnketLoading';
import AnketProgress from './AnketProgress';
import {useIsFocused} from '@react-navigation/native';
import {useBackHandler} from '@react-native-community/hooks';
import client from '../../utils/apollo';
import {INCOMING_REQUESTS_QUERY} from '../IncomingRequests/IncomingRequests.graphql';

const AnimatedView = Reanimated.createAnimatedComponent(View);

export type ANKET_FORMIK_PROPS = FormikProps<{
  userId: number;
  name: string;
  impressions: never[];
  guesses: never[];
}>;

const AnketForm = () => {
  const {t} = useTranslation();
  const onSubmitRequestCompleted = (
    makeRequest: SendRequestResponse,
    reset: () => void,
  ) => {
    const {ok, error, isMatch} = makeRequest;
    if (!ok) {
      errorCatcher(error, {
        title: 'Cant perform request',
        message: error || 'unknown error',
      });
      reset();
      return;
    }
    if (isMatch) {
      showSuccessToast(
        t('app.anket.matchMessage.title'),
        t('app.anket.matchMessage.description'),
      );
    }
    // REMOVE ACTIVE ANKET, SET ACTIVE REQUEST RESULT
    dispatch(setRequestResult({requestResult: makeRequest}));
    dispatch(setRequestStateReviewing());
    client.refetchQueries(INCOMING_REQUESTS_QUERY);
    reset(); // Reset mutation loading/error state
    return;
  };

  const [
    submitRequest,
    {loading: makeRequestLoading, reset: makeRequestReset},
  ] = useMutation<{
    makeRequest: SendRequestResponse;
  }>(SEND_REQUEST_MUTATION, {
    onError: e => {
      errorCatcher(e);
      console.log(e);
      makeRequestReset();
    },
    onCompleted: ({makeRequest}) => {
      onSubmitRequestCompleted(makeRequest, makeRequestReset);
    },
    fetchPolicy: 'no-cache',
  });

  const [activeStep, setActiveStep] = useState<STEP>(IMPRESSIONS);
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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

  const handleQuitForm = () => {
    Alert.alert(
      t('app.anket.controls.quitTitle'),
      t('app.anket.controls.quitDescription'),
      [
        {
          text: t('app.anket.controls.quitConfirm'),
          style: 'destructive',
          onPress: () => {
            dispatch(setRequestStateIdle());
            dispatch(clearAnket());
          },
        },
        {
          text: t('app.anket.controls.quitCancel'),
          style: 'cancel',
          onPress: () => null,
        },
      ],
    );
  };
  const setPreviousStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex - 1 > -1) {
      setActiveStep(STEPS[currentIndex - 1]);
      return;
    }
    handleQuitForm();
  };

  const initialValues = anket && generateAnketInitialValues(anket);

  const formNavigation = {
    setNextStep: setNextStep,
    setPreviousStep: setPreviousStep,
  };

  useBackHandler(() => {
    if (isFocused) {
      setPreviousStep();
      return true;
    }
    return false;
  });

  if (!anket) {
    dispatch(setRequestStateIdle());
    return null;
  }

  const renderStep = (item: STEP, formikProps: ANKET_FORMIK_PROPS) => {
    const elementMapper = {
      [IMPRESSIONS]: (
        <Impressions
          key={IMPRESSIONS}
          sex={anket.sex}
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
          formNavigation={{
            ...formNavigation,
            nextStepTitle: t('app.anket.controls.complete'),
            setNextStep: () => submitRequest({variables: formikProps.values}),
          }}
          formikProps={formikProps}
          anket={anket}
        />
      ),
    };

    return !makeRequestLoading && activeStep === item && elementMapper[item];
  };

  return (
    <AnimatedView style={styles.container}>
      <AnketHeader />
      {/* @ts-ignore */}
      <Formik initialValues={initialValues} onSubmit={console.warn}>
        {formikProps => (
          <AnimatedView style={styles.anketMainContainer}>
            <AnketProgress progress={getCurrentProgress()} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollable}>
              {/* @ts-ignore */}
              {STEPS.map(step => renderStep(step, formikProps))}
              {makeRequestLoading && <AnketLoading />}
            </ScrollView>
          </AnimatedView>
        )}
      </Formik>
    </AnimatedView>
  );
};

export default AnketForm;

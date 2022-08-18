import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {BodyCopy, Subtitle} from '../../components/Typography';
import Reanimated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';

import styles from './Anket.styles';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import {BRIEFING, IMPRESSIONS, QUESTIONS} from './Anket.types';
import Impressions from './Anket.Impressions';
import Profiling from './Anket.Profiling';
import QuestionsStep from './Anket.Questions';
import {ANKET_FORMIK_PROPS} from './AnketForm';
import {Anket} from '../Search/Search.graphql';

const AnimatedView = Reanimated.createAnimatedComponent(View);
type Props = {
  heading: string;
  description: string;
  children?: ReactNode;
  navigation: {
    setPreviousStep: () => void;
    previousStepTitle?: string;
    setNextStep: () => void;
    nextStepTitle?: string;
  };
  buttonDisabled?: boolean;
};

const AnketStep = ({
  heading,
  description,
  children,
  navigation,
  buttonDisabled,
}: Props) => {
  return (
    <AnimatedView
      style={styles.stepContainer}
      entering={SlideInDown.duration(480).delay(120)}
      exiting={SlideOutDown.duration(480).delay(120)}>
      <View style={styles.stepInfo}>
        <Subtitle style={styles.stepTitle}>{heading}</Subtitle>
        <BodyCopy style={styles.stepDescription}>{description}</BodyCopy>
      </View>
      {children}
      <View style={styles.stepControls}>
        <SecondaryButton
          style={styles.stepPreviousButton}
          title={navigation.previousStepTitle || 'Previous'}
          onPress={navigation.setPreviousStep}
        />
        <PrimaryButton
          style={styles.stepNextButton}
          title={navigation.nextStepTitle || 'Next'}
          disabled={buttonDisabled}
          onPress={navigation.setNextStep}
        />
      </View>
    </AnimatedView>
  );
};

export const stepMapper = (
  navigation: {setNextStep: () => void; setPreviousStep: () => void},
  handleQuitForm: () => void,
  formikProps: ANKET_FORMIK_PROPS,
  anket: Anket,
) => {
  const elementMapper = {
    [IMPRESSIONS]: (
      <Impressions
        setNextStep={navigation.setNextStep}
        handleQuitForm={handleQuitForm}
        formikProps={formikProps}
      />
    ),
    [BRIEFING]: (
      <Profiling
        formNavigation={navigation}
        formikProps={formikProps}
        anket={anket}
      />
    ),
    [QUESTIONS]: (
      <QuestionsStep
        formNavigation={navigation}
        formikProps={formikProps}
        anket={anket}
      />
    ),
  };

  return elementMapper;
};

export default AnketStep;

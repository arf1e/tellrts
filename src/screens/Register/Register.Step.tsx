import {View} from 'react-native';
import React from 'react';
import Reanimated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

import styles from './Register.styles';
import RegisterControlPanel from './Register.ControlPanel';
import {BodyCopy, Title} from '../../components/Typography';
import {FormikProps} from 'formik';
import {REGISTER_FORM_VALUES} from './Register.types';
import StepTracker from './Register.StepTracker';
import Link from '../../components/Links';

const AnimatedView = Reanimated.createAnimatedComponent(View);

interface Props {
  title: string;
  description: string;
  primaryAction: () => any;
  secondaryAction: () => any;
  children: React.ReactNode;
  disabled?: boolean;
  steps: string[];
  currentStep: number;
  formikProps: any;
  isReviewing?: boolean;
  toReview?: () => void;
}

type StepHeaderProps = {
  isReviewing?: boolean;
  toReview?: () => void;
  steps: string[];
  currentStep: number;
  formikProps: FormikProps<REGISTER_FORM_VALUES>;
};

const StepHeader = ({
  isReviewing,
  toReview,
  steps,
  currentStep,
  formikProps,
}: StepHeaderProps) => {
  return (
    <View style={styles.stepHeader}>
      <StepTracker
        formikProps={formikProps}
        steps={steps}
        currentStep={currentStep}
      />
      {isReviewing && (
        <Link onPress={toReview} containerStyle={styles.reviewLinkContainer}>
          Check
        </Link>
      )}
    </View>
  );
};

export default ({
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  disabled,
  currentStep,
  steps,
  formikProps,
  isReviewing,
  toReview,
}: Props): React.ReactElement => {
  return (
    <AnimatedView style={styles.stepContainer}>
      <StepHeader
        formikProps={formikProps}
        steps={steps}
        currentStep={currentStep}
        isReviewing={isReviewing}
        toReview={toReview}
      />
      <AnimatedView
        entering={FadeInDown.duration(240).delay(240)}
        exiting={FadeOutDown.duration(240)}>
        <Title style={styles.stepTitle}>{title}</Title>
        <BodyCopy style={styles.stepDescription}>{description}</BodyCopy>
        {children}
      </AnimatedView>
      <RegisterControlPanel
        primaryAction={primaryAction}
        disabled={disabled}
        secondaryAction={secondaryAction}
      />
    </AnimatedView>
  );
};

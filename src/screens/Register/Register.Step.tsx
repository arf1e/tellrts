import {View} from 'react-native';
import React from 'react';

import styles from './Register.styles';
import RegisterControlPanel from './Register.ControlPanel';
import {BodyCopy, Title} from '../../components/Typography';
import {FormikProps} from 'formik';
import {REGISTER_FORM_VALUES} from './Register';
import StepTracker from './Register.StepTracker';
import Link from '../../components/Links';

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
  isReviewing: boolean;
  toReview?: () => void;
}

type StepHeaderProps = {
  isReviewing: boolean;
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
    <View style={styles.stepContainer}>
      <StepHeader
        formikProps={formikProps}
        steps={steps}
        currentStep={currentStep}
        isReviewing={isReviewing}
        toReview={toReview}
      />
      <Title style={styles.stepTitle}>{title}</Title>
      <BodyCopy style={styles.stepDescription}>{description}</BodyCopy>
      {children}
      <RegisterControlPanel
        primaryAction={primaryAction}
        disabled={disabled}
        secondaryAction={secondaryAction}
      />
    </View>
  );
};

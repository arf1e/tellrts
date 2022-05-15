import {View} from 'react-native';
import React from 'react';

import styles from './Register.styles';
import RegisterControlPanel from './Register.ControlPanel';
import {BodyCopy, Subtitle, Title} from '../../components/Typography';

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
  isReviewing?: Boolean;
  toReview?: () => void;
}

interface StepHeaderProps {
  isReviewing?: boolean;
  toReview?: () => void;
  steps: string[];
  currentStep: number;
  formikProps: any;
}

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

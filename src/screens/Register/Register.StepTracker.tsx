import React from 'react';
import {View} from 'react-native';

import {schema} from './Register.utils';
import styles from './Register.styles';
import {REGISTER_FORM_VALUES} from './Register.types';
import {FormikProps} from 'formik';

type StepProps = {
  active: boolean;
  checked: boolean;
};

type TrackerProps = {
  steps: string[];
  currentStep: number;
  formikProps: FormikProps<REGISTER_FORM_VALUES>;
};

const Step = ({active, checked}: StepProps) => {
  const stepDotStyles = [
    styles.stepDot,
    active ? styles.stepDotActive : checked ? styles.stepDotChecked : null,
  ];

  return <View style={stepDotStyles} />;
};

const StepTracker = ({steps, currentStep, formikProps}: TrackerProps) => {
  return (
    <View style={styles.stepDotsContainer}>
      {steps.map(st => (
        <Step
          active={steps[currentStep] === st}
          key={st}
          // @ts-ignore
          checked={schema.fields[st]?.isValidSync(formikProps.values[st])}
        />
      ))}
    </View>
  );
};

export default StepTracker;

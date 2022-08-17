import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {BodyCopy, Subtitle} from '../../components/Typography';
import Reanimated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';

import styles from './Anket.styles';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';

const AnimatedView = Reanimated.createAnimatedComponent(View);
type Props = {
  heading: string;
  description: string;
  children?: ReactNode;
  navigation: {
    previousStep: () => void;
    previousStepTitle?: string;
    nextStep: () => void;
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
          onPress={navigation.previousStep}
        />
        <PrimaryButton
          style={styles.stepNextButton}
          title={navigation.nextStepTitle || 'Next'}
          disabled={buttonDisabled}
          onPress={navigation.nextStep}
        />
      </View>
    </AnimatedView>
  );
};

export default AnketStep;

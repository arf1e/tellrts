import React, {ReactNode, useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {BodyCopy, Subtitle} from '../../components/Typography';
import Reanimated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';

import styles from './Anket.styles';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
  useEffect(() => {
    const onBackPress = () => {
      navigation.setPreviousStep();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });
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
          title={
            navigation.previousStepTitle || t('app.anket.controls.previous')
          }
          onPress={navigation.setPreviousStep}
        />
        <PrimaryButton
          style={styles.stepNextButton}
          title={navigation.nextStepTitle || t('app.anket.controls.next')}
          disabled={buttonDisabled}
          onPress={navigation.setNextStep}
        />
      </View>
    </AnimatedView>
  );
};

export default AnketStep;

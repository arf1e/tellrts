import React, {ReactNode} from 'react';
import {Alert, Pressable, View} from 'react-native';
import {Subtitle} from '../../components/Typography';
import Reanimated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

import styles from './Anket.styles';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import {useTranslation} from 'react-i18next';
import colors from '../../utils/colors';

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

const AnketStepInfo = ({onPress}: {onPress: () => void}) => (
  <Pressable
    onPress={onPress}
    style={styles.stepDescriptionButton}
    hitSlop={16}>
    <Icon size={24} name="info" color={colors.primary} />
  </Pressable>
);

const AnketStep = ({
  heading,
  description,
  children,
  navigation,
  buttonDisabled,
}: Props) => {
  const {t} = useTranslation();
  const showDescription = () =>
    Alert.alert(heading, description, [
      {text: t('app.anket.controls.descriptionOk'), onPress: () => null},
    ]);
  return (
    <AnimatedView
      style={styles.stepContainer}
      entering={SlideInDown.duration(480).delay(120)}
      exiting={SlideOutDown.duration(480).delay(120)}>
      <View style={styles.stepInfo}>
        <Subtitle style={styles.stepTitle}>{heading}</Subtitle>
        <AnketStepInfo onPress={showDescription} />
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

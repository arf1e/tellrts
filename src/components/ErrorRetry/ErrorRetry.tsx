import React from 'react';
import {View} from 'react-native';
import styles from './ErrorRetry.styles';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';
import {BodyCopy} from '../../components/Typography';
import PrimaryButton from '../Buttons';
import Reanimated, {FadeIn, FadeOut} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';

const ErrorContainer = Reanimated.createAnimatedComponent(View);

type Props = {
  heading: string;
  description: string | null;
  retryTitle: string;
  retryOnPress: () => void;
};

const ErrorRetry = ({
  heading,
  description,
  retryTitle,
  retryOnPress,
}: Props) => {
  return (
    <ErrorContainer
      style={styles.errorContainer}
      exiting={FadeOut.duration(animationConstants.BUTTON_OUT)}
      entering={FadeIn.duration(animationConstants.BUTTON_IN).springify()}>
      <Icon
        size={48}
        color={colors.bad}
        name="x-square"
        style={styles.errorIcon}
      />
      <BodyCopy style={styles.errorHeading}>{heading}</BodyCopy>
      {description && (
        <BodyCopy style={styles.errorDescription}>{description}</BodyCopy>
      )}
      <PrimaryButton title={retryTitle} onPress={retryOnPress} />
    </ErrorContainer>
  );
};

export default ErrorRetry;

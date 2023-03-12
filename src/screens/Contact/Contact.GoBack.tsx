import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ZoomIn} from 'react-native-reanimated';
import CircleButton from '../../components/Buttons/CircleButton';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import styles from './Contact.styles';

const ContactGoBack = () => {
  const navigation = useNavigation();

  return (
    <CircleButton
      onPress={() => navigation.goBack()}
      icon="chevron-back"
      size={44}
      iconColor={colors.primary}
      style={styles.contactGoBack}
      entering={ZoomIn.duration(animationConstants.BUTTON_IN).delay(
        animationConstants.BUTTON_IN * 1.5,
      )}
    />
  );
};

export default ContactGoBack;

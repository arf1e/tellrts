import React from 'react';
import {View} from 'react-native';
import styles from './AttachTelegram.styles';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';
import {BodyCopy} from '../../components/Typography';

const AttachTelegramError = ({}) => {
  return (
    <View style={styles.errorContainer}>
      <Icon
        size={48}
        color={colors.bad}
        name="x-square"
        style={styles.errorIcon}
      />
      <BodyCopy style={styles.errorHeading}>
        {t('app.settings.socialLinks.telegram.errorHeading')}
      </BodyCopy>
      <BodyCopy style={styles.errorDescription}>{displayError}</BodyCopy>
      <PrimaryButton
        title={t('app.settings.socialLinks.telegram.retryButtonTitle')}
        onPress={retryGenerateCode}
      />
    </View>
  );
};

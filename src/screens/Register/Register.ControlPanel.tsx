import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import styles from './Register.styles';

interface Props {
  primaryAction: () => any;
  secondaryAction: () => any;
  style?: any;
  disabled?: boolean;
}

export default ({
  primaryAction,
  secondaryAction,
  style,
  disabled,
}: Props): React.ReactElement => {
  const {t} = useTranslation();
  return (
    <View style={[styles.controlPanel, style ? style : null]}>
      <SecondaryButton
        title={t('register.controls.back')}
        onPress={secondaryAction}
        style={styles.utilSecondary}
        testID="Register.ControlPanel.back"
      />
      <PrimaryButton
        title={t('register.controls.next')}
        onPress={primaryAction}
        style={styles.utilPrimary}
        disabled={disabled}
        testID="Register.ControlPanel.next"
      />
    </View>
  );
};

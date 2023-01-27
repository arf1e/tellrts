import styles from './AttachTelegram.styles';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {Linking, View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';

type Props = {
  code: string;
};

const TelegramCode = ({code}: Props) => {
  const copyStringToClipboard = (string: string) => {
    Clipboard.setString(string);
  };
  return (
    <View style={styles.codeContainer}>
      <BodyCopy style={styles.code}>{code}</BodyCopy>
      <BodyCopy style={styles.codeInstructions}>
        Отправьте этот код нашему Telegram-боту для связки ваших аккаунтов.
      </BodyCopy>
      <PrimaryButton
        title="Скопировать код"
        onPress={() => copyStringToClipboard(code)}
      />
      <SecondaryButton
        title="Открыть чат-бот"
        onPress={() => Linking.openURL('https://t.me/tellr_bot')}
      />
    </View>
  );
};

export default TelegramCode;

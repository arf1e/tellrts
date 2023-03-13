import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Container from '../../components/Container';
import Option from '../../components/Option/Option';
import {BodyCopy} from '../../components/Typography';
import {
  LANGUAGE_ENGLISH,
  LANGUAGE_RUSSIAN,
  setLanguage,
} from '../../utils/i18n';
import styles from './UpdateLanguage.styles';

const UpdateLanguage = () => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.screenContainer}>
      <Container>
        <BodyCopy>{t('app.updateLanguage.description')}</BodyCopy>
        <View style={styles.languageControls}>
          <Option
            title="English"
            isActive={i18n.language === LANGUAGE_ENGLISH}
            pressable={{
              style: styles.languageOption,
            }}
            onPress={() => setLanguage('en')}
          />
          <Option
            title="Русский"
            isActive={i18n.language === LANGUAGE_RUSSIAN}
            pressable={{
              style: styles.languageOption,
            }}
            onPress={() => setLanguage('ru')}
          />
        </View>
      </Container>
    </View>
  );
};

export default UpdateLanguage;

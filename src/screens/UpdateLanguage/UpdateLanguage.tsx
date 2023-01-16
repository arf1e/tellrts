import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Container from '../../components/Container';
import Option from '../../components/Option/Option';
import {BodyCopy} from '../../components/Typography';
import client from '../../utils/apollo';
import styles from './UpdateLanguage.styles';

const UpdateLanguage = () => {
  const {t, i18n} = useTranslation();

  const setLanguage = async (language: 'en' | 'ru') => {
    i18n.changeLanguage(language);
    await client.refetchQueries({
      include: 'active',
    });
  };

  return (
    <View style={styles.screenContainer}>
      <Container>
        <BodyCopy>{t('app.updateLanguage.description')}</BodyCopy>
        <View style={styles.languageControls}>
          <Option
            title="English"
            isActive={i18n.language === 'en'}
            pressable={{
              style: styles.languageOption,
            }}
            onPress={() => setLanguage('en')}
          />
          <Option
            title="Русский"
            isActive={i18n.language === 'ru'}
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

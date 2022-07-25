import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Container from '../../components/Container';
import DismissKeyboard from '../../components/DismissKeyboard';
import {BodyCopy} from '../../components/Typography';
import Form from './Form';
import styles from './UpdatePassword.styles';

const UpdatePassword = () => {
  const {t} = useTranslation();
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Container>
          <BodyCopy style={styles.description}>
            {t('app.settings.password.description')}
          </BodyCopy>
          <Form />
        </Container>
      </View>
    </DismissKeyboard>
  );
};

export default UpdatePassword;

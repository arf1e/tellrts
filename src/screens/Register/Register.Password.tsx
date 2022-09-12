import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import {useTranslation} from 'react-i18next';
import styles from './Register.styles';
import Field from '../../components/Field';
import {FormikProps} from 'formik';
import Fieldcheck from './Register.Fieldcheck';
import {REGISTER_FORM_VALUES} from './Register.types';

type Props = {
  formikProps: FormikProps<REGISTER_FORM_VALUES>;
};

const Password = ({formikProps}: Props) => {
  const {t} = useTranslation();

  return (
    <View>
      <View style={styles.passwordFieldContainer}>
        <BodyCopy style={styles.fieldTitle}>
          {t('register.password.passwordInputTitle')}
        </BodyCopy>
        <Field
          secureTextEntry
          value={formikProps.values.password}
          onChangeText={formikProps.handleChange('password')}
        />
      </View>
      <View style={styles.passwordFieldContainer}>
        <BodyCopy style={styles.fieldTitle}>
          {t('register.password.passwordConfirmTitle')}
        </BodyCopy>
        <Field
          secureTextEntry
          value={formikProps.values.passwordConfirm}
          onChangeText={formikProps.handleChange('passwordConfirm')}
        />
      </View>
      <KeyboardAvoidingView
        style={styles.passwordChecksContainer}
        behavior="padding"
        keyboardVerticalOffset={100}>
        <Fieldcheck
          title={t('register.password.minLength')}
          isPassing={
            !formikProps.errors?.password?.includes(
              t('register.password.minLength'),
            )
          }
        />
        <Fieldcheck
          title={t('register.password.uppercase')}
          isPassing={
            !formikProps.errors?.password?.includes(
              t('register.password.uppercase'),
            )
          }
        />
        <Fieldcheck
          title={t('register.password.number')}
          isPassing={
            !formikProps.errors?.password?.includes(
              t('register.password.number'),
            )
          }
        />
        <Fieldcheck
          title={t('register.password.passwordsShouldBeEqual')}
          isPassing={
            formikProps.values.password.length >= 8 &&
            formikProps.values.password === formikProps.values.passwordConfirm
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Password;

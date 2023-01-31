import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import {useTranslation} from 'react-i18next';
import styles from './Register.styles';
import Field from '../../components/Field';
import {FormikProps} from 'formik';
import Fieldcheck from './Register.Fieldcheck';
import {REGISTER_FORM_VALUES} from './Register.types';
import {YUP_PASSWORD_ERRORS} from './Register.utils';

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
          testID="Register.Password.Password"
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
          testID="Register.Password.PasswordConfirm"
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
            !formikProps.errors?.password?.includes(YUP_PASSWORD_ERRORS.min)
          }
        />
        <Fieldcheck
          title={t('register.password.uppercase')}
          isPassing={
            !formikProps.errors?.password?.includes(
              YUP_PASSWORD_ERRORS.uppercase,
            )
          }
        />
        <Fieldcheck
          title={t('register.password.number')}
          isPassing={
            !formikProps.errors?.password?.includes(YUP_PASSWORD_ERRORS.number)
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

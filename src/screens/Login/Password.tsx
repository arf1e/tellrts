import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import PrimaryButton from '../../components/Buttons';
import {SIGNUP_SCREEN} from '../../components/Navigation/AuthNavigator';
import {BodyCopy} from '../../components/Typography';
import Field from '../../components/Field';
import LoginStyles from './Login.styles';

interface Props {
  emailExists: boolean;
  email: string;
  goBack: () => void;
}

const passwordValidationSchema = yup.object({
  password: yup.string().required(),
});

const initialValues = {
  password: '',
};

const Password = ({emailExists, email, goBack}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const renderSignUpButton = () => (
    <PrimaryButton
      title={t('login.form.signUpBtn')}
      onPress={() => navigation.navigate(SIGNUP_SCREEN, {email})}
    />
  );

  const renderLoginForm = () => (
    <>
      <BodyCopy style={LoginStyles.fieldTitle}>
        {t('login.form.passwordFieldTitle')}
      </BodyCopy>
      <Formik
        initialValues={initialValues}
        validationSchema={passwordValidationSchema}>
        {({handleChange, handleSubmit}) => (
          <>
            <Field
              secureTextEntry
              autoFocus
              style={LoginStyles.emailField}
              onChangeText={handleChange('password')}
            />
            <PrimaryButton
              title={t('login.form.loginBtn')}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </>
  );
  return (
    <View>
      <BodyCopy
        onPress={goBack}
        style={LoginStyles.emailBtn}>{`< ${email}`}</BodyCopy>
      {!emailExists && renderSignUpButton()}
      {emailExists && renderLoginForm()}
    </View>
  );
};

export default Password;

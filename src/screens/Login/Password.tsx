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
import {gql, useMutation} from '@apollo/client';
import {useDispatch} from 'react-redux';
import {logIn} from '../../utils/slices/authSlice';
import errorCatcher from '../../utils/toasts';

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

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

const Password = ({emailExists, email, goBack}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onLoginMutationCompleted = ({
    error,
    token,
  }: {
    error: string;
    token: string;
  }) => {
    if (error) {
      errorCatcher(error);
      return;
    }

    if (token) {
      dispatch(logIn({token}));
      return;
    }
  };

  const [login, {data, loading, error}] = useMutation(LOGIN_MUTATION, {
    onCompleted: loginMutationData =>
      onLoginMutationCompleted(loginMutationData.login),
    onError: errorCatcher,
  });

  const handleLogin = (password: string) => {
    login({variables: {email, password}});
  };

  const renderSignUpButton = () => (
    <PrimaryButton
      title={t('login.form.signUpBtn')}
      onPress={() => navigation.navigate(SIGNUP_SCREEN, {email})}
    />
  );

  const renderLoginForm = () => {
    return (
      <>
        <BodyCopy style={LoginStyles.fieldTitle}>
          {t('login.form.passwordFieldTitle')}
        </BodyCopy>
        <Formik
          initialValues={initialValues}
          validationSchema={passwordValidationSchema}
          onSubmit={values => handleLogin(values.password)}>
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
  };
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

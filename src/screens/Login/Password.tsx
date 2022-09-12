import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Reanimated, {FadeInRight} from 'react-native-reanimated';

import PrimaryButton from '../../components/Buttons';
import {SIGNUP_SCREEN} from '../../components/Navigation/AuthNavigator';
import {BodyCopy} from '../../components/Typography';
import Field from '../../components/Field';
import LoginStyles from './Login.styles';
import {gql, useMutation} from '@apollo/client';
import {useDispatch} from 'react-redux';
import {logIn} from '../../utils/slices/authSlice';
import {YUP_PASSWORD_CHECK_FIELD} from '../Register/Register.utils';
import ErrorDisplay from '../../components/ErrorDisplay';
import {ArrowLink} from '../../components/Links';

const AnimatedView = Reanimated.createAnimatedComponent(View);

interface Props {
  emailExists: boolean;
  email: string;
  goBack: () => void;
}

const passwordValidationSchema = yup.object({
  password: YUP_PASSWORD_CHECK_FIELD,
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

  const onLoginMutationCompleted = (
    {
      error,
      token,
    }: {
      error: string;
      token: string;
    },
    setError: (message: string) => void,
  ) => {
    if (error) {
      setError(error);
      return;
    }

    if (token) {
      dispatch(logIn({token}));
      return;
    }
  };

  const [login, {loading: loginLoading}] = useMutation(LOGIN_MUTATION, {});

  const handleLogin = (
    password: string,
    setError: (message: string) => void,
  ) => {
    login({
      variables: {email, password},
      onCompleted: loginMutationData =>
        onLoginMutationCompleted(loginMutationData.login, setError),
      onError: error => setError(error.message),
    });
  };

  const renderSignUpButton = () => (
    <PrimaryButton
      title={t('login.form.signUpBtn')}
      // @ts-ignore
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
          validateOnChange={false}
          validationSchema={passwordValidationSchema}
          onSubmit={(values, {setFieldError}) =>
            handleLogin(values.password, (message: string) =>
              setFieldError('password', message),
            )
          }>
          {({handleChange, handleSubmit, errors}) => (
            <>
              <Field
                secureTextEntry
                autoFocus
                style={LoginStyles.emailField}
                onChangeText={handleChange('password')}
              />
              {errors.password && <ErrorDisplay error={errors.password} />}
              <PrimaryButton
                title={t('login.form.loginBtn')}
                loading={loginLoading}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </>
    );
  };
  return (
    <AnimatedView entering={FadeInRight.duration(320).delay(450)}>
      {/* <ArrowLink arrowPosition='back' onPress={goBack}>{email}</ArrowLink> */}
      <BodyCopy
        onPress={goBack}
        style={LoginStyles.emailBtn}>{`< ${email}`}</BodyCopy>
      {!emailExists && renderSignUpButton()}
      {emailExists && renderLoginForm()}
    </AnimatedView>
  );
};

export default Password;

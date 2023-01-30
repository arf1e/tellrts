import {useBackHandler} from '@react-native-community/hooks';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, SafeAreaView, StatusBar, View} from 'react-native';

import styles from './Register.styles';
import colors from '../../utils/colors';

import DismissKeyboard from '../../components/DismissKeyboard';
import {LOGIN_SCREEN} from '../../components/Navigation/AuthNavigator';
import {Formik} from 'formik';
import {
  validateSchema,
  schema,
  REGISTER_FORM_INITIAL_VALUES,
} from './Register.utils';
import {useTranslation} from 'react-i18next';
import {useMutation} from '@apollo/client';
import errorCatcher from '../../utils/toasts';
import {generateRNFile} from '../../utils/photo';
import {logIn} from '../../utils/slices/authSlice';
import {useDispatch} from 'react-redux';
import {REGISTER_MUTATION} from './Register.graphql';
import {GraphQLError} from 'graphql';
import {REGISTER_FORM_VALUES} from './Register.types';
import RegisterFormNavigation from './Register.FormNavigation';

const Register = ({
  navigation,
  route,
}: NativeStackScreenProps<ParamListBase>) => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);
  const dispatch = useDispatch();
  const previousStep = () => {
    if (step === 0) {
      askIfGetBackToLoginPage();
      return false;
    } else {
      setStep(step - 1);
      return true;
    }
  };
  const [isReviewing, setIsReviewing] = useState(false);

  const {t} = useTranslation();
  const getToReviewStep = () => setStep(6);

  const navigateFormDuringReview = (index: number) => {
    setIsReviewing(true);
    setStep(index);
  };

  const askIfGetBackToLoginPage = () =>
    Alert.alert(t('register.quit.title'), t('register.quit.description'), [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => null,
      },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => navigation.navigate(LOGIN_SCREEN),
      },
    ]);

  useBackHandler(() => {
    if (step > 0) {
      setStep(step - 1);
      return true;
    } else {
      askIfGetBackToLoginPage();
      return true;
    }
  });

  const onRegisterMutationCompleted = (
    {error, token}: {error: GraphQLError; token: string},
    reset: () => void,
  ) => {
    if (error) {
      errorCatcher({
        name: t('register.check.registerError'),
        message: error,
      });
      console.log(error);
      reset();
      return;
    }

    dispatch(logIn({token}));
  };
  // @ts-ignore
  const [register, {loading: registerLoading, reset: registerReset}] =
    useMutation(REGISTER_MUTATION, {
      // @ts-ignore
      onCompleted: data =>
        onRegisterMutationCompleted(data.createAccount, registerReset),
      onError: e => {
        errorCatcher(e);
        registerReset();
      },
    });

  const handleRegister = async (values: REGISTER_FORM_VALUES) => {
    const {birthdayInput} = values;
    const photoFile = await generateRNFile(values.photo);
    await register({
      variables: {
        name: values.name,
        email: values.email,
        birthday: birthdayInput,
        sex: values.sex,
        photo: photoFile,
        countryCode: values.countryCode,
        cityId: values.cityId,
        password: values.password,
      },
      fetchPolicy: 'no-cache',
    });
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.screenWrapper}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <Formik
            initialValues={{
              ...REGISTER_FORM_INITIAL_VALUES,
              // @ts-ignore
              email: route.params?.email || '',
            }}
            onSubmit={values => console.log(values)}
            validate={validateSchema(schema)}>
            {formikProps => (
              <RegisterFormNavigation
                step={step}
                formikProps={formikProps}
                isReviewing={isReviewing}
                getToReviewStep={getToReviewStep}
                nextStep={nextStep}
                previousStep={previousStep}
                navigateFormDuringReview={navigateFormDuringReview}
                handleRegister={handleRegister}
                registerLoading={registerLoading}
              />
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Register;

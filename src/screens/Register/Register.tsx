import {useBackHandler} from '@react-native-community/hooks';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, SafeAreaView, StatusBar, View} from 'react-native';
import moment from 'moment';

import styles from './Register.styles';
import colors from '../../utils/colors';

import DismissKeyboard from '../../components/DismissKeyboard';
import {LOGIN_SCREEN} from '../../components/Navigation/AuthNavigator';
import {BodyCopy} from '../../components/Typography';
import {Formik} from 'formik';
import {validateSchema, schema} from './Register.utils';
import Step from './Register.Step';
import Field from '../../components/Field';
import {useTranslation} from 'react-i18next';
import SelectGender from './Register.SelectGender';
import Datefield from '../../components/Field/Datefield';
import Photo from './Register.Photo';
import Location from './Register.Location';
import Password from './Register.Password';
import Check from './Register.Check';
import {useMutation} from '@apollo/client';
import errorCatcher from '../../utils/toasts';
import {generateRNFile} from '../../utils/photo';
import {logIn} from '../../utils/slices/authSlice';
import {useDispatch} from 'react-redux';
import {REGISTER_MUTATION} from './Register.graphql';
import {GraphQLError} from 'graphql';
import {REGISTER_FORM_VALUES} from './Register.types';

export const stepMapper = [
  'name',
  'sex',
  'birthday',
  'photo',
  'cityId',
  'password',
  'check',
];

const REGISTER_FORM_INITIAL_VALUES: REGISTER_FORM_VALUES = {
  name: '',
  birthday: null,
  birthdayInput: '',
  sex: null,
  photo: '',
  countryCode: null,
  countryTitle: '',
  cityId: '',
  cityTitle: '',
  password: '',
  passwordConfirm: '',
  email: '',
};

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
              <>
                {step === 0 && (
                  <Step
                    title={t('register.name.title')}
                    description={t('register.name.description')}
                    disabled={
                      !schema.fields.name.isValidSync(formikProps.values.name)
                    }
                    steps={stepMapper}
                    formikProps={formikProps}
                    currentStep={step}
                    isReviewing={isReviewing}
                    toReview={getToReviewStep}
                    primaryAction={nextStep}
                    secondaryAction={previousStep}>
                    <View style={styles.input}>
                      <BodyCopy style={styles.inputTitle}>
                        {t('register.name.fieldTitle')}
                      </BodyCopy>
                      <Field
                        value={formikProps.values.name}
                        onChangeText={(value: any) =>
                          formikProps.setFieldValue('name', value)
                        }
                        placeholder={t('register.name.fieldPlaceholder')}
                        style={styles.utilForm}
                      />
                    </View>
                  </Step>
                )}
                {step === 1 && (
                  <Step
                    steps={stepMapper}
                    formikProps={formikProps}
                    currentStep={step}
                    title={t('register.sex.title')}
                    isReviewing={isReviewing}
                    toReview={getToReviewStep}
                    description={t('register.sex.description')}
                    disabled={
                      !schema.fields.sex.isValidSync(formikProps.values.sex)
                    }
                    primaryAction={nextStep}
                    secondaryAction={previousStep}>
                    <View>
                      <SelectGender
                        sex={formikProps.values.sex}
                        handleChange={bool =>
                          formikProps.setFieldValue('sex', bool)
                        }
                      />
                    </View>
                  </Step>
                )}
                {step === 2 && (
                  <Step
                    steps={stepMapper}
                    formikProps={formikProps}
                    currentStep={step}
                    title={t('register.birthday.title')}
                    isReviewing={isReviewing}
                    toReview={getToReviewStep}
                    description={t('register.birthday.description')}
                    disabled={
                      !schema.fields.birthday.isValidSync(
                        formikProps.values.birthday,
                      )
                    }
                    primaryAction={nextStep}
                    secondaryAction={previousStep}>
                    <View style={styles.input}>
                      <BodyCopy style={styles.inputTitle}>
                        {t('register.birthday.fieldTitle')}
                      </BodyCopy>
                      <Datefield
                        mask="[00]-[00]-[0000]"
                        placeholder={t('register.birthday.placeholder')}
                        onChangeText={value => {
                          formikProps.handleChange('birthdayInput')(value);
                          value.length === 10
                            ? formikProps.handleChange('birthday')(
                                moment(value, 'DD-MM-YYYY').toString(),
                              )
                            : formikProps.handleChange('birthday')('');
                        }}
                        value={formikProps.values.birthdayInput}
                      />
                    </View>
                  </Step>
                )}
                {step === 3 && (
                  <Step
                    steps={stepMapper}
                    formikProps={formikProps}
                    currentStep={step}
                    isReviewing={isReviewing}
                    toReview={getToReviewStep}
                    title={t('register.photo.title')}
                    description={
                      schema.fields.photo.isValidSync(formikProps.values.photo)
                        ? t('register.photo.descriptionAttached')
                        : t('register.photo.description')
                    }
                    disabled={
                      !schema.fields.photo.isValidSync(formikProps.values.photo)
                    }
                    primaryAction={nextStep}
                    secondaryAction={previousStep}>
                    <Photo formikProps={formikProps} />
                  </Step>
                )}
                {step === 4 && (
                  <Step
                    steps={stepMapper}
                    formikProps={formikProps}
                    currentStep={step}
                    isReviewing={isReviewing}
                    toReview={getToReviewStep}
                    title={t('register.location.title')}
                    secondaryAction={previousStep}
                    primaryAction={nextStep}
                    disabled={
                      !(
                        schema.fields.cityId.isValidSync(
                          formikProps.values.cityId,
                        ) &&
                        schema.fields.countryCode.isValidSync(
                          formikProps.values.countryCode,
                        ) &&
                        schema.fields.countryTitle.isValidSync(
                          formikProps.values.countryTitle,
                        )
                      )
                    }
                    description={t('register.location.description')}>
                    <Location formikProps={formikProps} />
                  </Step>
                )}
                {step === 5 && (
                  <Step
                    steps={stepMapper}
                    formikProps={formikProps}
                    currentStep={step}
                    isReviewing={isReviewing}
                    toReview={getToReviewStep}
                    title={t('register.password.title')}
                    description={t('register.password.description')}
                    primaryAction={nextStep}
                    secondaryAction={previousStep}
                    disabled={
                      !(
                        schema.fields.password.isValidSync(
                          formikProps.values.password,
                        ) &&
                        formikProps.values.password ===
                          formikProps.values.passwordConfirm
                      )
                    }>
                    <Password formikProps={formikProps} />
                  </Step>
                )}
                {step === 6 && (
                  <Step
                    steps={stepMapper}
                    formikProps={formikProps}
                    currentStep={step}
                    title={t('register.check.title')}
                    description={t('register.check.description')}
                    primaryAction={() => handleRegister(formikProps.values)}
                    disabled={
                      !schema.isValidSync(formikProps.values) || registerLoading
                    }
                    secondaryAction={previousStep}>
                    <Check
                      formikProps={formikProps}
                      registerLoading={registerLoading}
                      navigateForm={navigateFormDuringReview}
                    />
                  </Step>
                )}
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Register;

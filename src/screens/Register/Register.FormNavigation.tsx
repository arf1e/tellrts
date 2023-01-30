import React from 'react';
import {View} from 'react-native';

import styles from './Register.styles';
import {BodyCopy} from '../../components/Typography';
import Field from '../../components/Field';
import {REGISTER_FORM_FORMIK_TYPE, schema} from './Register.utils';
import Step from './Register.Step';
import {useTranslation} from 'react-i18next';
import {stepMapper} from './Register.utils';
import RegisterSelectGender from './Register.SelectGender';
import Datefield from '../../components/Field/Datefield';
import moment from 'moment';
import Photo from './Register.Photo';
import Location from './Register.Location';
import Password from './Register.Password';
import Check from './Register.Check';
import {REGISTER_FORM_VALUES} from './Register.types';

type Props = {
  step: number;
  formikProps: REGISTER_FORM_FORMIK_TYPE;
  isReviewing: boolean;
  getToReviewStep: () => void;
  nextStep: () => void;
  previousStep: () => void;
  navigateFormDuringReview: (index: number) => void;
  handleRegister: (values: REGISTER_FORM_VALUES) => void;
  registerLoading: boolean;
};

const RegisterFormNavigation = ({
  step,
  formikProps,
  isReviewing,
  getToReviewStep,
  nextStep,
  previousStep,
  navigateFormDuringReview,
  handleRegister,
  registerLoading,
}: Props) => {
  const {t} = useTranslation();
  return (
    <>
      {step === 0 && (
        <Step
          title={t('register.name.title')}
          description={t('register.name.description')}
          disabled={!schema.fields.name.isValidSync(formikProps.values.name)}
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
          disabled={!schema.fields.sex.isValidSync(formikProps.values.sex)}
          primaryAction={nextStep}
          secondaryAction={previousStep}>
          <View>
            <RegisterSelectGender
              sex={formikProps.values.sex}
              handleChange={bool => formikProps.setFieldValue('sex', bool)}
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
            !schema.fields.birthday.isValidSync(formikProps.values.birthday)
          }
          primaryAction={nextStep}
          secondaryAction={previousStep}>
          <View style={styles.input}>
            <BodyCopy style={styles.inputTitle}>
              {t('register.birthday.fieldTitle')}
            </BodyCopy>
            <Datefield
              mask="[00]-[00]-[0000]"
              testID="Register.birthday.BirthdayInput"
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
          disabled={!schema.fields.photo.isValidSync(formikProps.values.photo)}
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
              schema.fields.cityId.isValidSync(formikProps.values.cityId) &&
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
              schema.fields.password.isValidSync(formikProps.values.password) &&
              formikProps.values.password === formikProps.values.passwordConfirm
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
          disabled={!schema.isValidSync(formikProps.values) || registerLoading}
          secondaryAction={previousStep}>
          <Check
            formikProps={formikProps}
            registerLoading={registerLoading}
            navigateForm={navigateFormDuringReview}
          />
        </Step>
      )}
    </>
  );
};

export default RegisterFormNavigation;

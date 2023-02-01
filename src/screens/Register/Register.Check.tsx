import React, {useState} from 'react';
import FullScreenModal from '../../components/Modals';
import {ActivityIndicator, View} from 'react-native';

import styles from './Register.styles';
import Field from '../../components/Field';
import {REGISTER_FORM_VALUES} from './Register.types';
import {FormikProps} from 'formik';
import {BodyCopy} from '../../components/Typography';
import Link, {ImageLink} from '../../components/Links';
import {useTranslation} from 'react-i18next';
import colors from '../../utils/colors';
import PrimaryButton from '../../components/Buttons';
import {
  BIRTHDAY_STEP,
  FORM_STEP,
  getStepIndex,
  LOCATION_STEP,
  NAME_STEP,
  PHOTO_STEP,
  SEX_STEP,
} from './Register.utils';

type Props = {
  formikProps: FormikProps<REGISTER_FORM_VALUES>;
  navigateForm: (index: number) => void;
  registerLoading?: boolean;
  submitError?: any;
};

type CheckFieldProps = {
  title: string;
  value: string;
  onValuePress: () => void;
};

const CheckTextField = ({title, value, onValuePress}: CheckFieldProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.checkTextField}>
      <BodyCopy style={styles.checkTextFieldTitle}>{title}</BodyCopy>
      <Link onPress={onValuePress}>{value || t('register.check.noValue')}</Link>
    </View>
  );
};

const Check = ({formikProps, navigateForm, registerLoading}: Props) => {
  const [isEmailModalActive, setIsEmailModalActive] = useState(false);
  const {t} = useTranslation();
  const getToFormStep = (step: FORM_STEP) => {
    const index = getStepIndex(step);
    navigateForm(index);
  };
  return (
    <View>
      {registerLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.secondary}
          testID="Register.Check.Loading"
        />
      ) : (
        <View style={styles.checkFields}>
          <ImageLink
            onPress={() => getToFormStep(PHOTO_STEP)}
            size={150}
            uri={formikProps.values.photo.path}
          />
          <CheckTextField
            title={t('register.check.nameTitle')}
            value={formikProps.values.name}
            onValuePress={() => getToFormStep(NAME_STEP)}
          />
          <CheckTextField
            title={t('register.check.dobTitle')}
            value={formikProps.values.birthdayInput}
            onValuePress={() => getToFormStep(BIRTHDAY_STEP)}
          />
          <CheckTextField
            title={t('register.check.sexTitle')}
            value={
              formikProps.values.sex
                ? t('register.sex.male')
                : t('register.sex.female')
            }
            onValuePress={() => getToFormStep(SEX_STEP)}
          />
          <CheckTextField
            title={t('register.check.cityTitle')}
            value={formikProps.values.cityTitle}
            onValuePress={() => getToFormStep(LOCATION_STEP)}
          />
          <CheckTextField
            title={t('register.check.emailTitle')}
            value={formikProps.values.email}
            onValuePress={() => setIsEmailModalActive(true)}
          />
        </View>
      )}
      <FullScreenModal
        active={isEmailModalActive}
        closeModal={() => setIsEmailModalActive(false)}
        title={t('register.check.emailTitle')}>
        <View>
          <BodyCopy style={styles.fieldTitle}>
            {t('register.check.emailFieldTitle')}
          </BodyCopy>
          <Field
            value={formikProps.values.email}
            onChangeText={formikProps.handleChange('email')}
            placeholder={t('register.check.emailFieldPlaceholder')}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoFocus
          />
          <PrimaryButton
            style={styles.emailModalFieldButton}
            title={t('register.check.emailApplyButton')}
            disabled={Boolean(formikProps.errors.email)}
            onPress={() => setIsEmailModalActive(false)}
          />
        </View>
      </FullScreenModal>
    </View>
  );
};

export default Check;

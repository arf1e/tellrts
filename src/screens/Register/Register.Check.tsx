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
  return (
    <View>
      {registerLoading ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        <View style={styles.checkFields}>
          <ImageLink
            onPress={() => navigateForm(3)}
            size={150}
            uri={formikProps.values.photo.path}
          />
          <CheckTextField
            title={t('register.check.nameTitle')}
            value={formikProps.values.name}
            onValuePress={() => navigateForm(0)}
          />
          <CheckTextField
            title={t('register.check.dobTitle')}
            value={formikProps.values.birthdayInput}
            onValuePress={() => navigateForm(1)}
          />
          <CheckTextField
            title={t('register.check.sexTitle')}
            value={
              formikProps.values.sex
                ? t('register.sex.male')
                : t('register.sex.female')
            }
            onValuePress={() => navigateForm(2)}
          />
          <CheckTextField
            title={t('register.check.cityTitle')}
            value={formikProps.values.cityTitle}
            onValuePress={() => navigateForm(4)}
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

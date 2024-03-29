import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import * as yup from 'yup';
import PrimaryButton from '../../components/Buttons';

import FormField from '../../components/Field/FormField';
import errorCatcher, {
  showInfoToast,
  showSuccessToast,
} from '../../utils/toasts';
import {MIN_PWD_LENGTH} from '../Register/Register.utils';
import {
  UpdatePasswordResponse,
  UPDATE_PASSWORD_MUTATION,
} from './UpdatePassword.graphql';
import styles from './UpdatePassword.styles';

const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('app.settings.password.schema.currentRequired')
    .min(MIN_PWD_LENGTH, 'app.settings.password.schema.minPassword'),
  newPassword: yup
    .string()
    .required('app.settings.password.schema.newRequired')
    .min(MIN_PWD_LENGTH, 'app.settings.password.schema.minPassword')
    .minUppercase(1, 'app.settings.password.schema.newMinUppercase'),
  newPasswordConfirm: yup
    .string()
    .required('app.settings.password.schema.confirmNewRequired')
    .min(MIN_PWD_LENGTH, 'app.settings.password.schema.minPassword')
    .oneOf(
      [yup.ref('newPassword')],
      'app.settings.password.schema.shouldMatch',
    ),
});

const FORM_INITIAL_VALUES = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const ERROR = 'ERROR';

type SCREEN_STATE = typeof IDLE | typeof LOADING | typeof ERROR;

const Form = () => {
  const {t} = useTranslation();
  const [state, setState] = useState<SCREEN_STATE>(IDLE);

  const [updatePassword] = useMutation<UpdatePasswordResponse>(
    UPDATE_PASSWORD_MUTATION,
  );

  const handleSubmitForm = async (
    values: {
      currentPassword: string;
      newPassword: string;
    },
    resetForm: () => void,
  ) => {
    setState(LOADING);
    await updatePassword({
      variables: {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      onCompleted: ({updatePassword: {ok, error}}) => {
        if (!ok) {
          setState(ERROR);
          errorCatcher(error, {
            title: t('app.settings.password.errorMessage.title'),
            message: error,
          });
          return;
        }
        setState(IDLE);
        showSuccessToast(
          t('app.settings.password.successMessage.title'),
          t('app.settings.password.successMessage.body'),
        );
        resetForm();
        return;
      },
      onError: error => {
        setState(ERROR);
        errorCatcher(error);
      },
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, actions) =>
        handleSubmitForm(values, actions.resetForm)
      }
      validateOnChange={false}
      validateOnMount={false}
      initialValues={FORM_INITIAL_VALUES}>
      {({values, submitForm, errors, handleChange}) => (
        <View style={styles.formContainer}>
          <FormField
            onChangeText={handleChange('currentPassword')}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            value={values.currentPassword}
            title={t('app.settings.password.currentPassword')}
            error={t(errors.currentPassword)}
          />
          <FormField
            onChangeText={handleChange('newPassword')}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            value={values.newPassword}
            title={t('app.settings.password.newPassword')}
            error={t(errors.newPassword)}
          />
          <FormField
            onChangeText={handleChange('newPasswordConfirm')}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            value={values.newPasswordConfirm}
            title={t('app.settings.password.newPasswordConfirm')}
            error={t(errors.newPasswordConfirm)}
          />
          <PrimaryButton
            title={t('app.settings.password.apply')}
            loading={state === LOADING}
            style={styles.submitFormBtn}
            onPress={submitForm}
          />
        </View>
      )}
    </Formik>
  );
};

export default Form;

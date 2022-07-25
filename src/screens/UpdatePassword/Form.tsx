import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import FormField from '../../components/Field/FormField';
import styles from './UpdatePassword.styles';

const Form = () => {
  return (
    <Formik>
      {formikProps => (
        <View style={styles.formContainer}>
          <FormField title="current password" />
          <FormField title="new password" />
          <FormField title="new password once again" />
        </View>
      )}
    </Formik>
  );
};

export default Form;

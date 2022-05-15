import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {gql, useLazyQuery} from '@apollo/client';
import Toast from 'react-native-toast-message';

import PrimaryButton from '../../components/Buttons';
import Field from '../../components/Field';
import {BodyCopy, Subtitle} from '../../components/Typography';
import LoginStyles from './Login.styles';
import Email from './Email';
import Password from './Password';
import errorCatcher from '../../utils/toasts';

const CHECK_EMAIL_QUERY = gql`
  query emailExists($email: String!) {
    checkEmail(email: $email) {
      ok
      emailExists
    }
  }
`;

const schema = yup.object({
  email: yup.string().required().email(),
});

const initialValues = {
  email: '',
};

const Form = () => {
  const {t} = useTranslation();
  const [step, setStep] = useState<0 | 1>(0);
  const [checkEmail, {data}] = useLazyQuery(CHECK_EMAIL_QUERY);
  return (
    <View style={LoginStyles.formContainer}>
      <Subtitle style={LoginStyles.formTitle}>{t('login.form.title')}</Subtitle>
      <Formik
        initialValues={initialValues}
        onSubmit={async ({email}) => {
          try {
            await checkEmail({variables: {email}}).then(() => setStep(1));
          } catch (e) {
            errorCatcher(e);
          }
        }}
        validationSchema={schema}
        validateOnChange={false}>
        {({handleChange, handleSubmit, errors, values}) => (
          <>
            {step === 0 && (
              <Email
                value={values.email}
                handleChange={handleChange('email')}
                error={errors.email}
                handleSubmit={handleSubmit}
              />
            )}
            {step === 1 && (
              <Password
                email={values.email}
                emailExists={data?.checkEmail?.emailExists}
                goBack={() => setStep(0)}
              />
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default Form;

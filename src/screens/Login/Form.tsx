import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {gql, useLazyQuery} from '@apollo/client';
import Reanimated, {FadeInUp, Layout} from 'react-native-reanimated';

import {Subtitle} from '../../components/Typography';
import LoginStyles from './Login.styles';
import Email from './Email';
import Password from './Password';
import errorCatcher from '../../utils/toasts';

const AnimatedView = Reanimated.createAnimatedComponent(View);

export const CHECK_EMAIL_QUERY = gql`
  query emailExists($email: String!) {
    checkEmail(email: $email) {
      ok
      emailExists
    }
  }
`;

const schema = yup.object({
  email: yup.string().required().email('login.email.errors.incorrectEmail'),
});

const initialValues = {
  email: '',
};

const Form = () => {
  const {t} = useTranslation();
  const [step, setStep] = useState<0 | 1>(0);
  const [checkEmail, {data, loading: checkEmailLoading}] = useLazyQuery(
    CHECK_EMAIL_QUERY,
    {
      fetchPolicy: 'network-only',
      onCompleted: () => {
        setStep(1);
      },
      onError: errorCatcher,
    },
  );
  return (
    <AnimatedView
      entering={FadeInUp.duration(240).damping(240)}
      layout={Layout}
      style={LoginStyles.formContainer}>
      <Subtitle style={LoginStyles.formTitle}>{t('login.form.title')}</Subtitle>
      <Formik
        initialValues={initialValues}
        onSubmit={({email}) => {
          console.log({email});
          // await checkEmail({variables: {email}});
        }}
        validationSchema={schema}
        validateOnBlur={true}
        validateOnChange={false}>
        {({handleChange, handleSubmit, errors, values}) => (
          <>
            {step === 0 && (
              <Email
                value={values.email}
                isInvalid={Boolean(errors.email)}
                error={errors.email}
                handleChange={handleChange('email')}
                handleSubmit={handleSubmit}
                loading={checkEmailLoading}
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
    </AnimatedView>
  );
};

export default Form;

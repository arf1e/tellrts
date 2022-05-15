import {FormikErrors} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import PrimaryButton from '../../components/Buttons';
import Field from '../../components/Field';
import {BodyCopy} from '../../components/Typography';
import LoginStyles from './Login.styles';

interface Props {
  value: string;
  handleChange: (field: string) => any;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  error?: string;
}

const Email = ({value, handleChange, handleSubmit, error}: Props) => {
  const {t} = useTranslation();
  return (
    <View>
      <BodyCopy style={LoginStyles.fieldTitle}>
        {t('login.form.emailFieldTitle')}
      </BodyCopy>
      <Field
        defaultValue={value}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder={t('login.form.emailPlaceholder')}
        style={LoginStyles.emailField}
        onChangeText={handleChange}
      />
      {error && <BodyCopy>{error}</BodyCopy>}
      <PrimaryButton title={t('login.form.btnTitle')} onPress={handleSubmit} />
    </View>
  );
};

export default Email;

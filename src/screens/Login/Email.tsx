import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Reanimated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import PrimaryButton from '../../components/Buttons';
import ErrorDisplay from '../../components/ErrorDisplay';
import Field from '../../components/Field';
import {BodyCopy} from '../../components/Typography';
import LoginStyles from './Login.styles';

const AnimatedView = Reanimated.createAnimatedComponent(View);

interface Props {
  value: string;
  handleChange: (field: string) => any;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  error?: string;
  loading?: boolean;
  isInvalid?: boolean;
}

const Email = ({
  value,
  handleChange,
  handleSubmit,
  error,
  loading,
  isInvalid,
}: Props) => {
  const {t} = useTranslation();
  return (
    <AnimatedView
      entering={FadeInLeft.duration(320).delay(120)}
      exiting={FadeOutLeft.duration(320).damping(5000)}>
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
        isInvalid={isInvalid}
      />
      {error && <ErrorDisplay error={error} />}
      <PrimaryButton
        testID="Login.CheckEmailBtn"
        title={t('login.form.btnTitle')}
        onPress={handleSubmit}
        loading={loading}
        // style={LoginStyles.formBtn}
      />
    </AnimatedView>
  );
};

export default Email;

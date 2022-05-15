import {FormikProps} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Subtitle} from '../../components/Typography';
import City from './Register.City';
import Country from './Register.Country';
import styles from './Register.styles';

type Props = {
  formikProps: FormikProps<any>;
};

const Location = ({formikProps}: Props) => {
  const setCountryCode = (code: string) =>
    formikProps.setFieldValue('countryCode', code);
  const setCountryInput = (name: string) =>
    formikProps.setFieldValue('countryInput', name);
  const countrySelected = formikProps.values.countryCode;
  const setCity = (id: string, title: string) => {
    formikProps.setFieldValue('cityId', id);
    formikProps.setFieldValue('cityTitle', title);
  };
  const currentCity = {
    id: formikProps.values.cityId,
    title: formikProps.values.cityTitle,
  };
  const clearCitySelection = () => setCity('', '');
  const {t} = useTranslation();
  return (
    <View>
      <Subtitle>{t('register.location.countryTitle')}</Subtitle>
      <Country
        setCountryCode={setCountryCode}
        countryInput={formikProps.values.countryInput}
        setCountryInput={setCountryInput}
        countrySelected={countrySelected}
        clearCitySelection={clearCitySelection}
      />
      {Boolean(countrySelected) && (
        <City
          countrySelected={countrySelected}
          setCity={setCity}
          currentCity={currentCity}
        />
      )}
    </View>
  );
};

export default Location;

import {FormikProps} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Subtitle} from '../../components/Typography';
import {REGISTER_FORM_VALUES} from './Register.types';
import {CountryPicker} from '../../components/CountryPicker';
import {CityPicker} from '../../components/CityPicker';
import styles from './Register.styles';

type Props = {
  formikProps: FormikProps<REGISTER_FORM_VALUES>;
};

const Location = ({formikProps}: Props) => {
  const setCountryCode = (code: string) =>
    formikProps.setFieldValue('countryCode', code);
  const setcountryTitle = (name: string) =>
    formikProps.setFieldValue('countryTitle', name);
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
      <Subtitle style={styles.locationSubtitle}>
        {t('register.location.countryTitle')}
      </Subtitle>
      <CountryPicker
        setCountryCode={setCountryCode}
        countryTitle={formikProps.values.countryTitle}
        setcountryTitle={setcountryTitle}
        countrySelected={countrySelected}
        clearCitySelection={clearCitySelection}
      />
      {Boolean(countrySelected) && (
        <CityPicker
          countrySelected={countrySelected}
          setCity={setCity}
          currentCity={currentCity}
        />
      )}
    </View>
  );
};

export default Location;

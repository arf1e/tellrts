import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import Field from '../../components/Field';
import Reanimated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Emoji from 'react-native-emoji';

import FullScreenModal from '../../components/Modals';
import {BodyCopy} from '../../components/Typography';
import {
  getCountriesByName,
  getCountryNameByCode,
  Country as CountryType,
} from '../../components/Modals/countries';
import styles from './CountryPicker.styles';
import PrimaryButton from '../../components/Buttons';
import {useTranslation} from 'react-i18next';
import Link from '../../components/Links/Link';
import i18next from 'i18next';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

type CountryProps = {
  setCountryCode: (code: string) => void;
  countryTitle?: string;
  countrySelected: string | null;
  setcountryTitle: (name: string) => void;
  clearCitySelection: () => void;
};

const CountryItem = ({
  country,
  onPress,
}: {
  country: CountryType;
  onPress: () => void;
}) => {
  const {i18n} = useTranslation();
  const language: 'ru' | 'en' = i18n.language;
  return (
    <AnimatedPressable
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={styles.optionContainer}
      onPress={onPress}>
      <Emoji name={`flag-${country.code.toLowerCase()}`} style={styles.flag} />
      <BodyCopy style={styles.optionTitle}>{country.name[language]}</BodyCopy>
    </AnimatedPressable>
  );
};

const CountryPicker = ({
  setCountryCode,
  countryTitle,
  setcountryTitle,
  countrySelected,
  clearCitySelection,
}: CountryProps) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [countriesResult, setCountriesResult] = useState<CountryType[]>([]);
  const {t} = useTranslation();
  const language = i18next.language;

  const handleCountryNameInput = (countryName: string) => {
    setCountryCode('');
    setcountryTitle(countryName);
    const matchedCountries = getCountriesByName(countryName, language).slice(
      0,
      4,
    );
    setCountriesResult(matchedCountries);
  };

  const handleCountryItemSelection = (country: CountryType) => {
    clearCitySelection();
    setcountryTitle(country.name[language]);
    setCountryCode(country.code);
    setCountriesResult([]);
  };

  const renderCountriesResult = () => (
    <View style={styles.resultsContainer}>
      {countriesResult.map(country => (
        <CountryItem
          country={country}
          onPress={() => handleCountryItemSelection(country)}
          key={country.code}
        />
      ))}
    </View>
  );

  const renderConfirmButton = () => (
    <PrimaryButton
      testID="Register.CountryPicker.ConfirmCountryButton"
      onPress={() => setIsModalActive(false)}
      title={t('register.location.apply')}
      style={styles.countryConfirmBtn}>
      <Emoji
        // @ts-ignore
        name={`flag-${countrySelected.toLowerCase()}`}
        style={styles.countryConfirmBtnEmoji}
      />
    </PrimaryButton>
  );

  const renderLinkTitle = (): string => {
    if (!countrySelected) {
      return t('register.location.countryPickModal');
    }
    return getCountryNameByCode(countrySelected, language);
  };

  return (
    <View>
      <Link onPress={() => setIsModalActive(true)}>{renderLinkTitle()}</Link>
      <FullScreenModal
        active={isModalActive}
        closeModal={() => setIsModalActive(false)}
        title={t('register.location.countryPickModal')}>
        <Field
          testID="Register.CountryPicker.Field"
          placeholder="Start typing..."
          onChangeText={handleCountryNameInput}
          style={styles.countryTitle}
          value={countryTitle}
          scrollEnabled={false}
        />
        {countriesResult.length > 0 && renderCountriesResult()}
        {Boolean(countrySelected) && renderConfirmButton()}
      </FullScreenModal>
    </View>
  );
};

export default CountryPicker;

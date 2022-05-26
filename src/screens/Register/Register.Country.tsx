import React, {useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';
import Field from '../../components/Field';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Emoji from 'react-native-emoji';

import FullScreenModal from '../../components/Modals';
import {BodyCopy} from '../../components/Typography';
import {
  getCountriesByName,
  getCountryNameByCode,
  Country as CountryType,
} from '../../components/Modals/countries';
import styles from './Register.styles';
import PrimaryButton from '../../components/Buttons';
import {useTranslation} from 'react-i18next';
import Link from '../../components/Links/Link';

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
  const appearShared = useSharedValue(0);
  useEffect(() => {
    appearShared.value = withTiming(1, {duration: 200});
    return function cleanup() {
      appearShared.value = withTiming(0, {duration: 150});
    };
  }, [appearShared]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(appearShared.value, [0, 1], [0, 1]),
    }),
    [appearShared],
  );
  const btnStyles = [styles.optionContainer, animatedStyle];
  return (
    <AnimatedPressable style={btnStyles} onPress={onPress}>
      <Emoji name={`flag-${country.code.toLowerCase()}`} style={styles.flag} />
      <BodyCopy style={styles.optionTitle}>{country.name}</BodyCopy>
    </AnimatedPressable>
  );
};

const Country = ({
  setCountryCode,
  countryTitle,
  setcountryTitle,
  countrySelected,
  clearCitySelection,
}: CountryProps) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [countriesResult, setCountriesResult] = useState<CountryType[]>([]);
  const {t} = useTranslation();

  const handleCountryNameInput = (countryName: string) => {
    setCountryCode('');
    setcountryTitle(countryName);
    const matchedCountries = getCountriesByName(countryName).slice(0, 4);
    setCountriesResult(matchedCountries);
  };

  const handleCountryItemSelection = (country: CountryType) => {
    clearCitySelection();
    setcountryTitle(country.name);
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
      onPress={() => setIsModalActive(false)}
      title={t('register.location.apply')}
      style={styles.countryConfirmBtn}>
      <Emoji
        name={`flag-${countrySelected.toLowerCase()}`}
        style={styles.countryConfirmBtnEmoji}
      />
    </PrimaryButton>
  );

  const renderLinkTitle = (): string => {
    if (!countrySelected) {
      return t('register.location.countryPickModal');
    }
    return getCountryNameByCode(countrySelected);
  };

  return (
    <View>
      <Link onPress={() => setIsModalActive(true)}>{renderLinkTitle()}</Link>
      <FullScreenModal
        active={isModalActive}
        closeModal={() => setIsModalActive(false)}
        title={t('register.location.countryPickModal')}>
        <Field
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

export default Country;

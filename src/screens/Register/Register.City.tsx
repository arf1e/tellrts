import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Pressable, View} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';

import FullScreenModal from '../../components/Modals';
import Link from '../../components/Links';
import {BodyCopy, Subtitle} from '../../components/Typography';

import styles from './Register.styles';
import Field from '../../components/Field';
import colors from '../../utils/colors';
import {GoogleLocationResult} from 'react-native-google-autocomplete/dist/services/Google.service';
import PrimaryButton from '../../components/Buttons';

const GOOGLE_API_KEY = 'AIzaSyDw6jMkY0hQFicfxsmzU1bKn-sFAHWUgS0';

type Props = {
  countrySelected: string | null;
  setCity: (id: string, title: string) => void;
  currentCity: {
    id: string;
    title: string;
  };
};

type CityResultProps = {
  city: GoogleLocationResult;
  onPress: () => void;
};

const CityResult = ({city, onPress}: CityResultProps) => {
  const btnStyles = [styles.optionContainer, styles.optionContainerCity];
  return (
    <Pressable style={btnStyles} onPress={onPress}>
      <BodyCopy style={styles.optionTitle}>
        {city.structured_formatting.main_text}
      </BodyCopy>
      <BodyCopy style={styles.cityDescription}>
        {city.structured_formatting.secondary_text}
      </BodyCopy>
    </Pressable>
  );
};

const City = ({countrySelected, setCity, currentCity}: Props) => {
  const {t} = useTranslation();
  const [modalActive, setModalActive] = useState(false);
  const [cityValue, setCityValue] = useState(currentCity.title || '');

  const handleChooseCity = (
    id: string,
    title: string,
    clearSearch: () => void,
  ) => {
    setCity(id, title);
    setCityValue(title);
    clearSearch();
  };

  const renderLinkTitle = () => {
    if (!currentCity.title) {
      return t('register.location.cityButton');
    } else {
      return currentCity.title;
    }
  };

  const handleLocationResults = (
    locationResults: GoogleLocationResult[],
    clearSearch: () => void,
  ): React.ReactNode => {
    const threeClosestResults = locationResults.slice(0, 3);
    return threeClosestResults.map(el => (
      <CityResult
        key={el.place_id}
        onPress={() =>
          handleChooseCity(
            el.place_id,
            el.structured_formatting.main_text,
            clearSearch,
          )
        }
        city={el}
      />
    ));
  };

  return (
    <View style={styles.cityContainer}>
      <Subtitle>{t('register.location.cityTitle')}</Subtitle>
      <Link onPress={() => setModalActive(true)}>{renderLinkTitle()}</Link>
      <FullScreenModal
        closeModal={() => setModalActive(false)}
        title={t('register.location.cityButton')}
        active={modalActive}>
        <GoogleAutoComplete
          apiKey={GOOGLE_API_KEY}
          debounce={300}
          minLength={2}
          // @ts-ignore
          components={`country:${countrySelected.toLowerCase()}`}
          queryTypes="(cities)">
          {({handleTextChange, locationResults, clearSearch, isSearching}) => (
            <>
              <Field
                value={cityValue}
                autoFocus
                placeholder={t('register.location.cityInputPlaceholder')}
                onChangeText={(text: string) => {
                  setCityValue(text);
                  if (text.length >= 2) {
                    handleTextChange(text);
                  } else {
                    clearSearch();
                  }
                }}
              />
              <View>
                {isSearching && cityValue.length > 2 && (
                  <ActivityIndicator size="small" color={colors.primary} />
                )}
                {Boolean(locationResults) &&
                  handleLocationResults(locationResults, clearSearch)}
                {Boolean(currentCity.id) && (
                  <PrimaryButton
                    style={styles.cityApplyBtn}
                    title={t('register.location.apply')}
                    onPress={() => setModalActive(false)}
                  />
                )}
              </View>
            </>
          )}
        </GoogleAutoComplete>
      </FullScreenModal>
    </View>
  );
};

export default City;

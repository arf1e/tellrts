import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './SearchParameters.styles';
import Container from '../../components/Container';
import {BodyCopy, Subtitle} from '../../components/Typography';
import OptionWithIcon from '../../components/Option/OptionWithIcon';
import {useDispatch, useSelector} from 'react-redux';
import {
  LOCATION_INTERNET,
  LOCATION_LOCAL,
  setSearchLocation,
} from '../../utils/slices/searchSettingsSlice';
import {useTranslation} from 'react-i18next';

const SearchParameters = () => {
  const {location} = useSelector(state => state.searchSettings);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.screenContainer}>
      <Container>
        <View style={styles.sectionContainer}>
          <Subtitle style={styles.sectionHeading}>
            {t('app.search.params.location.title')}
          </Subtitle>
          <BodyCopy style={styles.sectionDescription}>
            {t('app.search.params.location.description')}
          </BodyCopy>
          <View style={styles.optionsContainer}>
            <OptionWithIcon
              title={t('app.search.params.location.local')}
              isActive={location === LOCATION_LOCAL}
              onPress={() => dispatch(setSearchLocation(LOCATION_LOCAL))}
              icon={{title: 'location-outline', size: 24}}
            />
            <OptionWithIcon
              title={t('On the whole Internet')}
              isActive={location === LOCATION_INTERNET}
              onPress={() => dispatch(setSearchLocation(LOCATION_INTERNET))}
              icon={{title: 'planet-outline', size: 24}}
            />
          </View>
        </View>
      </Container>
    </ScrollView>
  );
};

export default SearchParameters;

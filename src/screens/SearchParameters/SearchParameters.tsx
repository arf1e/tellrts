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

const SearchParameters = () => {
  const {location} = useSelector(state => state.searchSettings);
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.screenContainer}>
      <Container>
        <View style={styles.sectionContainer}>
          <Subtitle style={styles.sectionHeading}>География</Subtitle>
          <BodyCopy style={styles.sectionDescription}>
            Искать пользователей, находящихся...
          </BodyCopy>
          <View style={styles.optionsContainer}>
            <OptionWithIcon
              title="В моём городе"
              isActive={location === LOCATION_LOCAL}
              onPress={() => dispatch(setSearchLocation(LOCATION_LOCAL))}
              icon={{title: 'location-outline', size: 24}}
            />
            <OptionWithIcon
              title="По всему Интернету"
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

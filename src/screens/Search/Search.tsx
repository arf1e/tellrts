import {View} from 'react-native';
import React from 'react';
import SearchHeader from './SearchHeader';
import styles from './Search.styles';
import SearchUsers from './SearchUsers';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import colors from '../../utils/colors';

const Search = () => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
      />
      <SearchHeader />
      <SearchUsers />
    </View>
  );
};

export default Search;

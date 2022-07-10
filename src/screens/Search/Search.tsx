import {View} from 'react-native';
import React from 'react';
import SearchHeader from './SearchHeader';
import styles from './Search.styles';
import SearchUsers from './SearchUsers';
import {BodyCopy} from '../../components/Typography';

const Search = () => {
  return (
    <View style={styles.container}>
      <SearchHeader />
      <SearchUsers />
    </View>
  );
};

export default Search;

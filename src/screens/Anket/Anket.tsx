import {Formik} from 'formik';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import PrimaryButton from '../../components/Buttons';
import {AnketState, clearAnket} from '../../utils/slices/anketSlice';

import styles from './Anket.styles';
import AnketHeader from '../../components/AnketHeader';
import AnketForm from './AnketForm';

const AnketScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.anketElementsContainer}>
        {/* <AnketHeader /> */}
        <AnketForm />
        {/* <PrimaryButton onPress={() => dispatch(clearAnket())} title="нахуй)" /> */}
      </View>
    </View>
  );
};

export default AnketScreen;

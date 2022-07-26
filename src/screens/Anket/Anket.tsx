import React from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryButton from '../../components/Buttons';
import {BodyCopy, Subtitle} from '../../components/Typography';
import {AnketState, clearAnket} from '../../utils/slices/anketSlice';
import styles from './Anket.styles';

const Anket = () => {
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container}>
      <Subtitle>Anket</Subtitle>
      <BodyCopy>{JSON.stringify(anket)}</BodyCopy>
      <PrimaryButton onPress={() => dispatch(clearAnket())} title="нахуй)" />
    </ScrollView>
  );
};

export default Anket;

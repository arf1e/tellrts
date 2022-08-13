import {Formik} from 'formik';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import PrimaryButton from '../../components/Buttons';
import {BodyCopy, Subtitle} from '../../components/Typography';
import {AnketState, clearAnket} from '../../utils/slices/anketSlice';
import {Anket} from '../Search/Search.graphql';
import styles from './Anket.styles';
import AnketHeader from '../../components/AnketHeader';

const generateAnketInitialValues = (anket: Anket) => {
  return {
    userId: anket.id,
    name: '',
    guesses: [],
  };
};

const AnketForm = () => {
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  const dispatch = useDispatch();
  const initialValues = {
    userId: anket?.id,
    name: '',
    guesses: [],
  };
  return (
    <ScrollView style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={console.warn}>
        {formikProps => (
          <>
            <AnketHeader />
            <BodyCopy>{JSON.stringify(formikProps.values)}</BodyCopy>
            <PrimaryButton
              onPress={() => dispatch(clearAnket())}
              title="нахуй)"
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AnketForm;

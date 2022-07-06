import React from 'react';
import {TextInput, View} from 'react-native';
import Container from '../../components/Container';
import DismissKeyboard from '../../components/DismissKeyboard';
import {Subtitle} from '../../components/Typography';
import styles from './EditAnswer.styles';
import * as yup from 'yup';

const validationSchema = yup.object({
  answer: yup.string().required().min(2).max(250),
});

const AnswerInput = () => {
  return <TextInput style={styles.input} autoFocus />;
};

export default () => {
  return (
    <DismissKeyboard>
      <View style={styles.inputContainer}>
        <Container>
          <AnswerInput />
        </Container>
      </View>
    </DismissKeyboard>
  );
};

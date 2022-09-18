import React from 'react';
import {View} from 'react-native';
import Container from '../../components/Container';
import DismissKeyboard from '../../components/DismissKeyboard';
import Form from './Form';
import styles from './UpdatePassword.styles';

const UpdatePassword = () => {
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Container>
          <Form />
        </Container>
      </View>
    </DismissKeyboard>
  );
};

export default UpdatePassword;

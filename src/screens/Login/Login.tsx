import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import colors from '../../utils/colors';
import Form from './Form';
import styles from './Login.styles';

const Login = () => {
  return (
    <DismissKeyboard>
      <View style={styles.background}>
        <View>
          <StatusBar backgroundColor={colors.primary} />
          <Image
            source={require('../../../assets/img/logo.png')}
            style={styles.logo}
          />
          <Form />
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default Login;

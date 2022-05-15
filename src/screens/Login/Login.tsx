import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DismissKeyboard from '../../components/DismissKeyboard';
import colors from '../../utils/colors';
import Form from './Form';
import styles from './Login.styles';

const Login = () => {
  return (
    <DismissKeyboard>
      <LinearGradient
        colors={['#1693A5', '#6C93BE', '#DC8DCB']}
        style={styles.background}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View>
          <StatusBar backgroundColor={colors.primary} />
          <Image
            source={require('../../../assets/img/logo.png')}
            style={styles.logo}
          />
          <Form />
        </View>
      </LinearGradient>
    </DismissKeyboard>
  );
};

export default Login;

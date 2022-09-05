/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Toast from 'react-native-toast-message';
import {ApolloProvider} from '@apollo/client';

import RootNavigator from './src/components/Navigation/RootNavigator';
import {Provider} from 'react-redux';
import {storePersistor, store} from './src/utils/store';
import {PersistGate} from 'redux-persist/integration/react';

import initializeI18n from './src/utils/i18n';
import {colorVariables} from './src/utils/colors';
import client from './src/utils/apollo';

import {SEARCH} from './src/components/Navigation/AppNavigator';
import {BodyCopy} from './src/components/Typography';
import {PROFILE} from './src/components/Navigation/ProfileNavigator';

const linkingConfig = {
  prefixes: ['tellr://'],
  config: {
    screens: {
      [PROFILE]: 'profile',
      [SEARCH]: 'search',
    },
  },
};

EStyleSheet.build({
  // colors
  ...colorVariables,
  // font sizes
  $h1: 38,
  $h2: 30,
  $h3: 24,
  $h4: 20,
  $bcLarge: 18,
  $bcBig: 16,
  $bcMedium: 14,
  $bcSmall: 12,
});

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  useEffect(() => {
    // if (!i18next.isInitialized) {
    // initializeI18n();
    // }
    initializeI18n();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={storePersistor}>
          <NavigationContainer
            linking={linkingConfig}
            fallback={<BodyCopy>TODO: Loading...</BodyCopy>}>
            <>
              <RootNavigator />
              <Toast />
            </>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

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
import {colorVariables} from './src/utils/colors';
import client from './src/utils/apollo';

import {
  PROFILE_NAVIGATOR,
  SEARCH,
} from './src/components/Navigation/AppNavigator';
import {
  ATTACH_INSTAGRAM,
  PROFILE,
  SOCIALS,
} from './src/components/Navigation/ProfileNavigator';
import {toastConfig} from './src/components/Toasts';
import RNBootSplash from 'react-native-bootsplash';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import initialiseTellrServices from './src/utils/init';

const linkingConfig = {
  prefixes: ['tellr://', 'https://app.tellr.ru/'],
  config: {
    screens: {
      [PROFILE_NAVIGATOR]: {
        screens: {
          [ATTACH_INSTAGRAM]: {
            path: 'socials/instagram/:code',
          },
        },
      },
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
    initialiseTellrServices();
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={storePersistor}>
          <NavigationContainer
            linking={linkingConfig}
            onReady={() => RNBootSplash.hide()}>
            <>
              <RootNavigator />
              <Toast config={toastConfig} />
            </>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default gestureHandlerRootHOC(() => <App />);

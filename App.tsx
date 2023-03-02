import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Toast from 'react-native-toast-message';
import {ApolloProvider} from '@apollo/client';

import RootNavigator from './src/components/Navigation/RootNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/utils/store';
import {PersistGate} from 'redux-persist/integration/react';
import {colorVariables} from './src/utils/colors';
import client from './src/utils/apollo';

import {
  PROFILE_NAVIGATOR,
  SEARCH,
} from './src/components/Navigation/AppNavigator';
import {ATTACH_INSTAGRAM} from './src/components/Navigation/ProfileNavigator';
import {toastConfig} from './src/components/Toasts';
import RNBootSplash from 'react-native-bootsplash';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import initialiseTellrServices from './src/utils/init';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet/src';

const linkingConfig = {
  prefixes: ['tellr://', 'https://app.tellr.ru/', 'https://app.tellr.dating/'],
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
  useEffect(() => {
    initialiseTellrServices();
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomSheetModalProvider>
            <NavigationContainer
              linking={linkingConfig}
              onReady={() => RNBootSplash.hide()}>
              <>
                <RootNavigator />
                <Toast config={toastConfig} />
              </>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default gestureHandlerRootHOC(() => <App />);

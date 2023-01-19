import i18next from 'i18next';
import initializeI18n from './i18n';
import {CometChat} from '@cometchat-pro/react-native-chat';

const CC_APP_ID = '229639f04bc1612f';
const CC_REGION = 'eu';
export const CC_AUTH_KEY = '049b55ffe64e9354a52db4059565408010f5da73';

const initialiseTellrServices = async () => {
  /**
   * A function to keep all the initialization functions together
   */

  if (!i18next.isInitialized) {
    initializeI18n();
  }

  const cometChatAppSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(CC_REGION)
    .build();
  await CometChat.init(CC_APP_ID, cometChatAppSettings).then(
    () => {
      console.log('CometChat was successfully initialized!');
    },
    error => {
      console.log(`CometChat initialization was failed with error: ${error}`);
    },
  );
};

export default initialiseTellrServices;

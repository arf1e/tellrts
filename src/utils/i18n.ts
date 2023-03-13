import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {Streami18n} from 'stream-chat-react-native';
import * as RNLocalize from 'react-native-localize';
import en from './en';
import ru from './ru';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './apollo';

export const LANGUAGE_RUSSIAN = 'ru';
export const LANGUAGE_ENGLISH = 'en';
const AS_LANGUAGE_KEY = 'language';

export type INTERFACE_LANGUAGE =
  | typeof LANGUAGE_ENGLISH
  | typeof LANGUAGE_RUSSIAN;

const userSystemLanguage = RNLocalize.getLocales()[0].languageCode;
export const streami18n = new Streami18n({language: userSystemLanguage});
const getProbablyExistingSavedLanguage = async () =>
  await AsyncStorage.getItem(AS_LANGUAGE_KEY);

const initialize = () => {
  getProbablyExistingSavedLanguage().then(savedLanguage => {
    const language = savedLanguage || userSystemLanguage;
    i18n.use(initReactI18next).init({
      debug: true,
      lng: language,
      fallbackLng: LANGUAGE_ENGLISH,
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        [LANGUAGE_ENGLISH]: {
          translation: en,
        },
        [LANGUAGE_RUSSIAN]: {
          translation: ru,
        },
      },
    });
    streami18n.setLanguage(language);
  });
};

export const setLanguage = async (language: INTERFACE_LANGUAGE) => {
  i18n.changeLanguage(language);
  streami18n.setLanguage(language);
  await client.refetchQueries({
    include: 'active',
  });
  await AsyncStorage.setItem(AS_LANGUAGE_KEY, language);
};

export default initialize;

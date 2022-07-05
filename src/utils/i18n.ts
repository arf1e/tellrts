import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';

const initialize = () =>
  i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
    },
  });

export default initialize;
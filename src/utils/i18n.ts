import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import ru from './ru';

const initialize = () =>
  i18n.use(initReactI18next).init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  });

export default initialize;

import i18next from 'i18next';
import initializeI18n, {streami18n} from './i18n';
import 'dayjs/locale/ru';

const initialiseTellrServices = async () => {
  /**
   * A function to keep all the initialization functions together
   */

  if (!i18next.isInitialized) {
    initializeI18n();
  }

  streami18n.setLanguage(i18next.language);
};

export default initialiseTellrServices;

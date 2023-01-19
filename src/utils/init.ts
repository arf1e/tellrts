import i18next from 'i18next';
import initializeI18n from './i18n';

const initialiseTellrServices = async () => {
  /**
   * A function to keep all the initialization functions together
   */

  if (!i18next.isInitialized) {
    initializeI18n();
  }
  initializeI18n();
};

export default initialiseTellrServices;

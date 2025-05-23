import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationCA from './locales/ca.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ca: {
    translation: translationCA,
  },
};

i18n
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

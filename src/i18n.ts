import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_en from "./assets/translations/en/common.json";
import common_es from "./assets/translations/es/common.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'es',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    resources: {
      en: {
        common: common_en
      },
      es: {
        common: common_es
      }
    },
  });

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_en_uk from "./assets/translations/en_uk/common.json";
import common_es from "./assets/translations/es/common.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'en_uk',
    fallbackLng: 'en_uk',
    debug: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    resources: {
      en_uk: {
        common: common_en_uk
      },
      es: {
        common: common_es
      }
    },
  });

export default i18n;
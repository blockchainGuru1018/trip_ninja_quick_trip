import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_en_uk from './assets/translations/en_uk/common.json';
import common_es from './assets/translations/es/common.json';
import common_jp from './assets/translations/jp/common.json';
import common_fr from './assets/translations/fr/common.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'en_uk',
    fallbackLng: 'en_uk',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en_uk: {
        common: common_en_uk,
      },
      es: {
        common: common_es,
      },
      jp: {
        common: common_jp,
      },
      fr: {
        common: common_fr,
      }
    },
  });

export default i18n;
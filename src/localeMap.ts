import { enGB, es, ja, fr } from 'date-fns/locale';
import 'moment/locale/enGb';

export const dateLocaleMap = {
  "en_uk": enGB,
  "es": es,
  "jp": ja,
  "fr": fr,
};

export const countryLocaleMap = [
  {"languageCode": "en_uk", "countryCode": "gb"},
  {"languageCode": "es", "countryCode": "es"},
  {"languageCode": "jp", "countryCode": "jp"},
  {"languageCode": "fr", "countryCode": "fr"},
];

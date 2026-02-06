import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import tr from './tr.json';
import en from './en.json';

const i18n = new I18n({
  en,
  tr,
});

// Set default locale to English
i18n.locale = 'en';

// Enable fallback
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export const t = (key: string, params?: Record<string, any>) => {
  return i18n.t(key, params);
};

export const useTranslation = () => {
  return {
    t,
    locale: i18n.locale,
    setLocale: (locale: string) => {
      i18n.locale = locale;
    },
  };
};

export default i18n;

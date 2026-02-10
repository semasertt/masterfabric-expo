import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import en from './en.json';
import tr from './tr.json';

const i18n = new I18n({ en, tr });
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const LOCALE_STORAGE_KEY = 'ritual_locale';
const SUPPORTED_LOCALES = ['en', 'tr'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

function getDeviceLocale(): AppLocale {
  const locales = Localization.getLocales();
  const code = locales[0]?.languageCode?.toLowerCase();
  if (code === 'tr') return 'tr';
  return 'en';
}

export const t = (key: string, params?: Record<string, unknown>) => {
  return i18n.t(key, params);
};

interface LocaleContextValue {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => Promise<void>;
}
const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>('en');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
        if (saved && (SUPPORTED_LOCALES as readonly string[]).includes(saved)) {
          i18n.locale = saved;
          setLocaleState(saved as AppLocale);
          return;
        }
      } catch (_) {}
      const device = getDeviceLocale();
      i18n.locale = device;
      setLocaleState(device);
    })();
  }, []);

  const setLocale = useCallback(async (newLocale: AppLocale) => {
    i18n.locale = newLocale;
    setLocaleState(newLocale);
    try {
      await AsyncStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch (_) {}
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export const useTranslation = () => ({
  t,
  locale: i18n.locale as AppLocale,
  setLocale: (l: string) => {
    i18n.locale = l;
  },
});

export default i18n;

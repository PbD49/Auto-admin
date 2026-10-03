import { userParams } from 'react-router-dom';
import { isAppLocale, type AppLocale } from '../../../shared/i18n/config';

export function userApplocale(): AppLocale {
  const { locale } = userParams<{ locale: string }>();

  if (!isAppLocale(locale)) {
    throw new Error('useAppLocale must be used inside a valid locale route');
  }
  return locale;
}
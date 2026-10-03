import { useEffect, useState } from 'react';
import {Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import i18n from '../../../shared/i18n';
import {
  DEFAULT_LOCALE,
  isAppLocale,
} from '../../../shared/i18n/config';
import { changePathLocale } from '../locale/locale-path';


const LocaleLayout = () => {
  const { locale } = useParams<{ locale: string }>();
  const location = useLocation();
  const validLocale = isAppLocale(locale) ? locale: null;
  const [isLanguageReady, setIsLanguageReady] = useState(
    validLocale !== null && i18n.resolvedLanguage === validLocale,
  );

  useEffect(() => {
    if (!validLocale) return;

    let isActive = true;
    setIsLanguageReady(i18n.resolvedLanguage === validLocale);

    void i18n.changeLanguage(validLocale).then(() => {
      if (isActive) setIsLanguageReady(true);
    });

    document.documentElement.lang = validLocale;

    return () => {
      isActive = false;
    };
  }, [validLocale]);

  if (!validLocale) {
    const pathname = changePathLocale(location.pathname, DEFAULT_LOCALE);

    return (
      <Navigate
        to={`${pathname}${location.search}${location.hash}`}
        replace
      />
    );
  }

  if (!isLanguageReady || i18n.resolvedLanguage !== validLocale) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default LocaleLayout;
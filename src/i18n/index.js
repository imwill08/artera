import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Function to load Bootstrap RTL CSS dynamically
const loadBootstrapRTL = () => {
  const existingLink = document.getElementById('bootstrap-rtl-css');
  if (existingLink) {
    return;
  }

  const link = document.createElement('link');
  link.id = 'bootstrap-rtl-css';
  link.rel = 'stylesheet';
  link.href = '/common/vendor/bootstrap/css/bootstrap.rtl.min.css';
  document.head.appendChild(link);
};

// Function to remove Bootstrap RTL CSS
const removeBootstrapRTL = () => {
  const existingLink = document.getElementById('bootstrap-rtl-css');
  if (existingLink) {
    existingLink.remove();
  }
};

// Function to update document direction and Bootstrap CSS
const updateDocumentDirection = (lng) => {
  if (lng === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.dir = 'rtl';
    loadBootstrapRTL();
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
    document.body.dir = 'ltr';
    removeBootstrapRTL();
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    lng: localStorage.getItem('language') || 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Function to change language and update document direction
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('language', lng);
  localStorage.setItem('languageChange', lng);
  updateDocumentDirection(lng);
};

// Initialize direction on load
if (typeof document !== 'undefined') {
  const savedLang = localStorage.getItem('language') || 'en';
  updateDocumentDirection(savedLang);
}

export default i18n;


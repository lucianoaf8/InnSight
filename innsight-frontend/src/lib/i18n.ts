import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import pt from "../locales/pt.json";

// Available languages
export const languages = {
  en: "English",
  pt: "Português"
};

// Get stored language from localStorage or default to 'en'
const getStoredLanguage = (): string => {
  try {
    const storedLang = localStorage.getItem("lang");
    return storedLang && Object.keys(languages).includes(storedLang) ? storedLang : "en";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "en";
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: getStoredLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Function to change language and persist to localStorage
export const changeLanguage = (lang: string): void => {
  try {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
};

export default i18n;

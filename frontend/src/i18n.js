import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import ur from "./locales/ur.json";
import ar from "./locales/ar.json";

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  ur: { translation: ur },
  ar: { translation: ar },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Update document direction when language changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  const isRTL = lng === "ar" || lng === "ur";
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

// Set initial direction
const isRTL = i18n.language === "ar" || i18n.language === "ur";
document.documentElement.dir = isRTL ? "rtl" : "ltr";
document.documentElement.lang = i18n.language;

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from './locales/tr.json';

const resources = {
    tr: {
        translation: tr
    }
};

i18n
.use(initReactI18next)
.init<any>({
    resources,
    lng: "tr",
    // @ts-ignore
    keySeparator: true
});

export default i18n;
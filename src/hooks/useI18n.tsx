import { useTranslation } from "react-i18next"

export const useI18n = (screenName: string) => {
    const { i18n, t }  = useTranslation("translation", {
        keyPrefix: screenName
    });
    
    return { i18n, t };
} 
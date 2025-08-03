import translations from '@/constant/translations.constant';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  translate: typeof translations[Language];
  toggleLanguage: () => void;
}

const validLanguages: Array<Language> = ["en", "es"]

const getSavedLanguage = () => {
  const storage = localStorage.getItem('portfolio-language') as any
  return validLanguages.includes(storage) ? storage : "es"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {

  const [language, setLanguage] = useState<Language>(getSavedLanguage)

  const updateLanguage = (newLang: Language) => {
    setLanguage(newLang)
    try {
      localStorage.setItem('portfolio-language', newLang)
    } catch (error) {
      console.warn('Could not save language to localStorage:', error)
    }
  }

  const toggleLanguage = () => {
    updateLanguage(language === 'es' ? 'en' : 'es');
  }


  return (
    <LanguageContext.Provider
      value={{
        language,
        translate: translations[language],
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

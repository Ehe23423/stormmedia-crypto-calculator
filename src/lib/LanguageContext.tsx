import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';
import type { Language } from './translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string, params?: Record<string, any>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Check local storage for saved language, default to 'en'
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('app_language');
        return (saved === 'en' || saved === 'pl' || saved === 'es' || saved === 'hi') ? saved as Language : 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
    };

    // Helper to get nested translation strings (e.g. t('tabs.HUNTER'))
    const t = (path: string, params?: Record<string, any>): any => {
        const keys = path.split('.');
        let current: any = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in lang: ${language}`);
                // Fallback to english
                let fallback: any = translations['en'];
                for (const fbKey of keys) {
                    if (fallback[fbKey] === undefined) return path; // Return path if totally missing
                    fallback = fallback[fbKey];
                }
                current = fallback;
                break;
            }
            current = current[key];
        }

        if (typeof current === 'string' && params) {
            let res = current;
            Object.entries(params).forEach(([k, v]) => {
                res = res.replace(`{${k}}`, String(v));
            });
            return res;
        }

        return current;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

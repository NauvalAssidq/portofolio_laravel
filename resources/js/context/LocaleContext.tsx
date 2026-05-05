import React, { createContext, useContext, useState, useCallback } from "react";
import id from "@/locales/id.json";
import en from "@/locales/en.json";

export type Locale = "id" | "en";

type Translations = typeof id;

const locales: Record<Locale, Translations> = { id, en };

interface LocaleContextValue {
    locale: Locale;
    t: Translations;
    setLocale: (l: Locale) => void;
    toggle: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
    locale: "id",
    t: id,
    setLocale: () => {},
    toggle: () => {},
});

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocaleState] = useState<Locale>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("locale") as Locale | null;
            if (stored === "id" || stored === "en") return stored;
        }
        return "id";
    });

    const setLocale = useCallback((l: Locale) => {
        setLocaleState(l);
        if (typeof window !== "undefined") localStorage.setItem("locale", l);
    }, []);

    const toggle = useCallback(() => {
        setLocale(locale === "id" ? "en" : "id");
    }, [locale, setLocale]);

    return (
        <LocaleContext.Provider value={{ locale, t: locales[locale], setLocale, toggle }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => useContext(LocaleContext);

"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Cookie } from 'lucide-react';
import { useLocale } from "@/context/LocaleContext";

export const CookieConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLocale();

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsentGiven');
        if (consent !== 'accepted' && consent !== 'declined') {
            const timer = setTimeout(() => setIsVisible(true), 150);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsentGiven', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsentGiven', 'declined');
        setIsVisible(false);
    };

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setIsMounted(true);
        } else if (!isVisible && isMounted) {
            const timer = setTimeout(() => setIsMounted(false), 350);
            return () => clearTimeout(timer);
        }
    }, [isVisible, isMounted]);


    if (!isMounted) {
        return null;
    }

    return (
        <div
            className={cn(
                "fixed bottom-4 left-4 right-4 z-[90] pointer-events-none",
                "flex justify-center"
            )}
        >
            <div
                className={cn(
                    "w-full max-w-3xl p-5 rounded-lg border border-gray-200/80 bg-white/80 shadow-xl backdrop-blur-lg pointer-events-auto",
                    "transition-all duration-300 ease-in-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Cookie className="w-7 h-7 text-indigo-500 flex-shrink-0 hidden sm:block mt-1" />
                    <div className="flex-grow">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.cookie.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            {t.cookie.description}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="ml-1 text-indigo-600 hover:underline text-xs font-medium">{t.cookie.policy}</a>.
                        </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto flex-shrink-0 mt-3 sm:mt-0 self-end sm:self-center">
                        <button
                            onClick={handleDecline}
                            className={cn(
                                "w-full sm:w-auto px-4 py-1.5 rounded-md text-xs font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            )}
                        >
                            {t.cookie.decline}
                        </button>
                        <button
                            onClick={handleAccept}
                            className={cn(
                                "w-full sm:w-auto px-4 py-1.5 rounded-md text-xs font-medium text-white bg-indigo-600 border border-transparent",
                                "transition-all duration-200 ease-in-out",
                                "shadow-sm hover:shadow-md hover:bg-indigo-700 hover:-translate-y-px"
                            )}
                        >
                            {t.cookie.accept}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

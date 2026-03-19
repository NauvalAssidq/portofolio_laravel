"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Assuming path
import { Cookie } from 'lucide-react'; // Using Cookie icon

export const CookieConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsentGiven');
        // Show banner only if consent hasn't been explicitly given or declined yet
        if (consent !== 'accepted' && consent !== 'declined') {
            // Delay showing slightly to avoid flash if localStorage check is fast
            const timer = setTimeout(() => setIsVisible(true), 150);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsentGiven', 'accepted');
        setIsVisible(false);
        // Add your analytics script initialization logic here
        // e.g., if (typeof window.initializeAnalytics === 'function') { window.initializeAnalytics(); }
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsentGiven', 'declined');
        setIsVisible(false);
        // Optionally handle decline logic (e.g., disable certain third-party scripts)
    };

    // Use state to manage mount/unmount for animation
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setIsMounted(true);
        } else if (!isVisible && isMounted) {
            // Wait for animation before unmounting
            const timer = setTimeout(() => setIsMounted(false), 350); // Match animation duration
            return () => clearTimeout(timer);
        }
    }, [isVisible, isMounted]);


    if (!isMounted) {
        return null; // Don't render if not visible or during unmount animation
    }

    return (
        <div
            className={cn(
                "fixed bottom-4 left-4 right-4 z-[90] pointer-events-none", // Container doesn't block clicks initially
                "flex justify-center" // Center the banner content
            )}
        >
            <div
                className={cn(
                    "w-full max-w-3xl p-5 rounded-lg border border-gray-200/80 bg-white/80 shadow-xl backdrop-blur-lg pointer-events-auto", // Content is clickable
                    "transition-all duration-300 ease-in-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Cookie className="w-7 h-7 text-indigo-500 flex-shrink-0 hidden sm:block mt-1" />
                    <div className="flex-grow">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Cookie Preferences</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            This website uses cookies to enhance user experience and analyze traffic.
                            By clicking "Accept", you consent to the use of cookies for these purposes.
                            {/* Remember to replace '#' with your actual Privacy Policy URL */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="ml-1 text-indigo-600 hover:underline text-xs font-medium">Privacy Policy</a>.
                        </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto flex-shrink-0 mt-3 sm:mt-0 self-end sm:self-center">
                        <button
                            onClick={handleDecline}
                            className={cn(
                                "w-full sm:w-auto px-4 py-1.5 rounded-md text-xs font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            )}
                        >
                            Decline
                        </button>
                        <button
                            onClick={handleAccept}
                            className={cn(
                                "w-full sm:w-auto px-4 py-1.5 rounded-md text-xs font-medium text-white bg-indigo-600 border border-transparent",
                                "transition-all duration-200 ease-in-out",
                                "shadow-sm hover:shadow-md hover:bg-indigo-700 hover:-translate-y-px" // Subtle hover effect
                            )}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

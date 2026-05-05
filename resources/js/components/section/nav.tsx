"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { locale, t, setLocale } = useLocale();

    useEffect(() => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
    }, [isScrolled]);

    const navLinks = [
        { key: "showcase", name: t.nav.showcase, href: "#showcase" },
        { key: "about",    name: t.nav.about,    href: "#about"    },
        { key: "services", name: t.nav.services,  href: "#services" },
        { key: "pricing",  name: t.nav.pricing,   href: "#pricing"  },
        { key: "contact",  name: t.nav.contact,   href: "#contact"  },
    ];

    useEffect(() => {
        const sections = navLinks.map(link => link.href.substring(1));

        const handleScroll = () => {
            if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
                setActiveSection("contact");
                return;
            }

            let current = "";
            sections.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= 100) {
                        current = id;
                    }
                }
            });

            if (window.scrollY < 100) {
                setActiveSection("");
            } else if (current) {
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [locale]); // re-register when locale changes (navLinks rebuilt)

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const offsetPosition = elementRect - bodyRect - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    /* ── Language toggle dropdown ── */
    const LangToggle = ({ className }: { className?: string }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label="Switch language"
                    className={cn(
                        "inline-flex items-center justify-center w-8 h-8 rounded-md border transition-all duration-300 overflow-hidden",
                        "border-gray-200 bg-white/80 hover:border-indigo-400 hover:bg-indigo-50",
                        "backdrop-blur-sm select-none",
                        className
                    )}
                >
                    <img 
                        src={locale === "id" ? "https://flagcdn.com/w40/id.png" : "https://flagcdn.com/w40/us.png"} 
                        alt={locale === "id" ? "ID" : "EN"}
                        className="w-full h-full object-cover"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px] rounded-md p-1.5 z-[110]">
                <DropdownMenuItem 
                    onClick={() => setLocale("id")}
                    className={cn("cursor-pointer rounded-lg py-2", locale === "id" && "bg-indigo-50 text-indigo-700 font-medium")}
                >
                    <img src="https://flagcdn.com/w40/id.png" alt="ID" className="w-5 h-auto rounded-[2px] shadow-sm mr-2.5" />
                    Bahasa
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => setLocale("en")}
                    className={cn("cursor-pointer rounded-lg py-2", locale === "en" && "bg-indigo-50 text-indigo-700 font-medium")}
                >
                    <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-5 h-auto rounded-[2px] shadow-sm mr-2.5" />
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <>
            {/* ── Mobile overlay ── */}
            <div
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                className={cn(
                    "fixed inset-0 z-[100] md:hidden bg-[#fafafa]",
                    "flex flex-col",
                    "transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]",
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
                )}
            >
                <div className="flex items-center justify-between px-4 sm:px-6 py-[14px]">
                    <a
                        href="#"
                        onClick={() => setMobileOpen(false)}
                        className="font-serif text-xl text-gray-900"
                    >
                        @Beethoval.dev
                    </a>
                    <div className="flex items-center gap-3">
                        <LangToggle />
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="inline-flex items-center justify-center p-2 text-gray-900 focus:outline-none"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col items-center justify-center gap-10 min-h-0 py-8">
                    {navLinks.map((link, i) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <a
                                key={link.key}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                style={{ transitionDelay: mobileOpen ? `${100 + i * 100}ms` : "0ms" }}
                                className={cn(
                                    "relative group font-serif text-4xl sm:text-5xl text-gray-900",
                                    "transition-all duration-700 ease-out",
                                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                                    isActive ? "text-indigo-600" : "hover:text-indigo-600"
                                )}
                            >
                                {link.name}
                                <span
                                    className={cn(
                                        "absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-indigo-600 transition-all duration-300 rounded-md",
                                        isActive ? "w-4" : "w-0 group-hover:w-4"
                                    )}
                                />
                            </a>
                        );
                    })}
                </nav>

                <div
                    className={cn(
                        "px-6 pb-16 flex justify-center",
                        "transition-all duration-700 ease-out",
                        mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: mobileOpen ? `${100 + navLinks.length * 100}ms` : "0ms" }}
                >
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "#contact")}
                        className="group inline-flex items-center justify-center gap-3 py-4 px-8 rounded-md text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                    >
                        <span>{t.nav.scheduleCall}</span>
                        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            {/* ── Desktop header ── */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                    isScrolled ? "pt-4 pb-2 sm:pt-6" : "py-4 sm:py-6"
                )}
            >
                <nav
                    className={cn(
                        "relative mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8",
                        "transition-all duration-300 ease-in-out",
                        "w-full max-w-7xl bg-transparent border-b border-transparent",
                        isScrolled && [
                            "py-2.5 px-3 md:py-3 md:px-4",
                            "w-[calc(100%-2rem)] md:max-w-4xl",
                            "rounded-md",
                            "border border-gray-200",
                            "bg-white/70",
                            "shadow-xl/10",
                            "backdrop-blur-lg",
                        ]
                    )}
                >
                    <a
                        href="#"
                        className={cn(
                            "font-serif text-xl text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md",
                            isScrolled ? "text-lg" : "text-xl",
                            "transition-all duration-300 ease-in-out"
                        )}
                    >
                        @Beethoval.dev
                    </a>

                    <div className="hidden md:flex items-center space-x-1 lg:space-x-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={cn(
                                        "group relative flex items-center gap-1.5 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-4 py-2",
                                        isActive
                                            ? "text-indigo-600 bg-indigo-50/80"
                                            : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50/50"
                                    )}
                                >
                                    <span className={cn(
                                        "font-medium relative z-10",
                                        isScrolled ? "text-xs lg:text-sm" : "text-sm"
                                    )}>
                                        {link.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right side: lang toggle + CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <LangToggle />
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, "#contact")}
                            className={cn(
                                "inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600",
                                "transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                                "shadow-[0_0_18px_rgba(79,70,229,0.25),_0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(79,70,229,0.55),_0_6px_16px_rgba(0,0,0,0.12)]",
                                "hover:bg-indigo-700 hover:-translate-y-px",
                                isScrolled ? "text-sm px-3 py-1.5" : "text-sm px-4 py-1.5"
                            )}
                        >
                            {t.nav.cta}
                            <ArrowRight className={cn("transition-transform duration-300", isScrolled ? "w-3 h-3" : "w-4 h-4")} />
                        </a>
                    </div>

                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav"
                        onClick={() => setMobileOpen((s) => !s)}
                        className={cn(
                            "md:hidden ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-700",
                            "transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                            isScrolled && "bg-white/50 hover:bg-gray-50/70"
                        )}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </nav>
            </header>
        </>
    );
};

export default Navbar;

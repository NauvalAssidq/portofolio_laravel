"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import {
    CreditCardIcon,
    Sparkles,

    MessageCircle,
    Menu,
    X,
    ArrowRight,
} from "lucide-react";

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
    }, [isScrolled]);

    const navLinks = [
        {
            name: "Showcase",
            href: "#showcase",
        },
        {
            name: "Services",
            href: "#services",
        },
        {
            name: "Pricing",
            href: "#pricing",
        },
        {
            name: "Contact",
            href: "#contact",
        },
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
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                "py-3"
            )}
        >
            <nav
                className={cn(
                    "relative mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8",
                    "transition-all duration-300 ease-in-out",
                    "w-full max-w-7xl bg-transparent border-b border-transparent",
                    isScrolled && [
                        "py-3 px-3",
                        "max-w-3xl",
                        "rounded-md",
                        "border border-gray-200/60",
                        "bg-white/70",
                        "shadow-md",
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
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={cn(
                                    "group relative flex items-center gap-1.5 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full px-4 py-2",
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

                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "#contact")}
                    className={cn(
                        "hidden md:inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600",
                        "transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                        "shadow-[0_0_18px_rgba(79,70,229,0.25),_0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(79,70,229,0.55),_0_6px_16px_rgba(0,0,0,0.12)]",
                        "hover:bg-indigo-700 hover:-translate-y-px",
                        isScrolled ? "text-sm px-3 py-1.5" : "text-sm px-4 py-1.5"
                    )}

                >
                    Get Started
                    <ArrowRight className={cn("transition-transform duration-300", isScrolled ? "w-3 h-3" : "w-4 h-4")} />
                </a>

                <button
                    type="button"
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-nav"
                    onClick={() => setMobileOpen((s) => !s)}
                    className={cn(
                        "md:hidden ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-700",
                        "transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                        isScrolled && "bg-white/50 hover:bg-gray-50/70"
                    )}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <div
                    id="mobile-nav"
                    className={cn(
                        "absolute left-3 right-3 top-full mt-2 origin-top rounded-xl border border-gray-200/80 bg-white/90 shadow-lg backdrop-blur-md md:hidden overflow-hidden",
                        "transition-[opacity,transform] duration-200 ease-out",
                        mobileOpen ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95",
                    )}
                >
                    <div className="flex flex-col divide-y divide-gray-100">
                        <div className="p-2 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-indigo-50 text-indigo-700"
                                                : "text-gray-800 hover:bg-gray-50 hover:text-indigo-600"
                                        )}
                                    >
                                        <span>{link.name}</span>
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                                    </a>
                                );
                            })}
                        </div>
                        <div className="p-3">
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, "#contact")}
                                className={cn(
                                    "flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600",
                                    "transition-all duration-200 ease-in-out",
                                    "shadow-sm hover:shadow-md hover:bg-indigo-700",
                                )}
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

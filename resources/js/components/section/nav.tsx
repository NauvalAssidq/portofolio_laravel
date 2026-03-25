"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
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
            name: "About",
            href: "#about",
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
        <>
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
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex items-center justify-center p-2 text-gray-900 focus:outline-none"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col items-center justify-center gap-10 min-h-0 py-8">
                    {navLinks.map((link, i) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                style={{
                                    transitionDelay: mobileOpen ? `${100 + i * 100}ms` : "0ms",
                                }}
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
                                        "absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-indigo-600 transition-all duration-300 rounded-full",
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
                        className="group inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                    >
                        <span>Schedule a Call</span>
                        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

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
                            "max-w-4xl",
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

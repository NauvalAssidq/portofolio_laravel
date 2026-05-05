import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Twitter, Dribbble, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);
    const { t } = useLocale();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: "0px 0px -150px 0px"
            }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const navigation = {
        main: [
            { name: t.footer.navHome,     href: "#" },
            { name: t.footer.navProjects, href: "#showcase" },
            { name: t.footer.navServices, href: "#services" },
            { name: t.footer.navPricing,  href: "#pricing" },
        ],
        social: [
            { name: "GitHub",   href: "#", icon: Github   },
            { name: "LinkedIn", href: "#", icon: Linkedin  },
            { name: "Twitter",  href: "#", icon: Twitter   },
            { name: "Dribbble", href: "#", icon: Dribbble  },
        ],
    };

    return (
        <footer 
            ref={sectionRef}
            className="relative w-full bg-gray-950 pt-32 pb-12 overflow-hidden"
            id="contact"
        >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div 
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 bottom-[-2%] text-[16vw] font-serif font-bold text-gray-900/60 leading-none whitespace-nowrap pointer-events-none select-none z-0",
                    "transition-all duration-1000 delay-300 ease-out",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
            >
                NAUVAL
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
                    
                    <div className={cn(
                        "lg:col-span-8 transition-all duration-1000 ease-out",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tighter mb-8">
                            {t.footer.title} <br className="hidden sm:block" />
                        </h2>
                        
                        <p className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed mb-12">
                            {t.footer.description}
                        </p>

                        <a 
                            href="mailto:nauvalsidiq0427@gmail.com"
                            className="group inline-flex items-center gap-4 text-2xl sm:text-3xl font-serif text-white hover:text-indigo-400 transition-colors duration-500"
                        >
                            <span>nauvalsidiq0427@gmail.com</span>
                            <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
                        </a>
                    </div>

                    <div className={cn(
                        "lg:col-span-4 grid grid-cols-2 gap-8 text-lg pt-4 lg:pt-0 transition-all duration-1000 delay-200 ease-out",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2">
                                {t.footer.sitemap}
                            </span>
                            {navigation.main.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 w-fit"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2">
                                {t.footer.socials}
                            </span>
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors duration-300 w-fit"
                                >
                                    <span>{item.name}</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cn(
                    "relative border-t border-gray-800 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-500 ease-out",
                    isInView ? "opacity-100" : "opacity-0"
                )}>

                    <p className="text-sm text-gray-500 relative z-10 w-full md:w-auto text-center md:text-left">
                        &copy; {currentYear} Nauval Assidq. {t.footer.rights}
                    </p>
                    
                    <div className="flex items-center justify-center md:justify-end gap-2 text-gray-500 text-sm relative z-10 w-full md:w-auto">
                        <span>{t.footer.credit}</span>
                    </div>
                </div>

                <div itemScope itemType="https://schema.org/ProfessionalService" style={{ display: "none" }}>
                    <span itemProp="name">Beethoval Dev</span>
                    <span itemProp="description">Freelance Web Developer in Banda Aceh.</span>
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <span itemProp="addressLocality">Banda Aceh</span>
                        <span itemProp="addressRegion">Aceh</span>
                        <span itemProp="addressCountry">ID</span>
                    </div>
                    <span itemProp="jobTitle">Web Developer</span>
                </div>
            </div>
        </footer>
    );
};

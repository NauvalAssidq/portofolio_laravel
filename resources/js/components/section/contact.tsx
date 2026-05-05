import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Copy, CheckCircle2, ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [copied, setCopied] = useState(false);
    const email = "nauvalsidiq0427@gmail.com";
    const { t } = useLocale();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { name: "GitHub", icon: Github, href: "#" },
        { name: "LinkedIn", icon: Linkedin, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#fafafa] py-8 sm:py-12 overflow-hidden"
            id="contact"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div 
                    className={cn(
                        "relative rounded-[2.5rem] bg-gray-900 overflow-hidden shadow-2xl transition-all duration-1000 transform",
                        isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
                    )}
                >
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

                    <div className="relative z-10 p-10 sm:p-16 lg:p-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                            
                            <div className="flex flex-col text-left">
                                <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-tight">
                                    {t.contact.title} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        {t.contact.titleAccent}
                                    </span>
                                </h2>

                                <p className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed mb-8 lg:mb-0">
                                    {t.contact.description}
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 lg:ml-auto w-full max-w-md">
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleCopy}
                                        className="group relative flex items-center justify-between w-full px-8 py-5 rounded-2xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)]"
                                    >
                                        <div className="flex items-center gap-3">
                                            {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Mail className="w-5 h-5" />}
                                            <span className="text-base sm:text-lg">{copied ? t.contact.copied : email}</span>
                                        </div>
                                        {!copied && (
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                                <Copy className="w-4 h-4 text-gray-600" />
                                            </div>
                                        )}
                                    </button>
                                    
                                    <a 
                                        href="mailto:nauvalsidiq0427@gmail.com" 
                                        className="group flex items-center justify-between w-full px-8 py-5 rounded-2xl bg-gray-800/50 text-white border border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <span className="text-base sm:text-lg font-medium">{t.contact.scheduleCall}</span>
                                        <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 my-2" />

                                <div className="flex items-center justify-start gap-4">
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mr-2">{t.contact.followMe}</span>
                                    {socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-500 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                                            aria-label={social.name}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import React, { useState, useEffect } from 'react';
import { ArrowRight } from "lucide-react";
import { Marquee } from '@/components/ui/marquee'
import Navbar from "@/components/section/nav"
import { languages, LanguageMarquee } from '@/components/hero/languagemq'

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const first = languages.slice(0, Math.ceil(languages.length / 2));
    const second = languages.slice(Math.ceil(languages.length / 2));

    return (
        <>
            <Navbar isScrolled={isScrolled} />
            <section className="relative min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
                <div className="w-7xl mx-auto z-10 overflow-visible">
                    <div className="flex">
                        <div className="inline-flex px-3 py-2 gap-2 items-center rounded-full text-sm font-medium bg-white border border-gray-200 mb-8">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span>
                                Only 2 Spots Available, Starting From IDR 1,500K
                            </span>
                        </div>
                    </div>

                    <div className="overflow-visible">
                        <h1 className="text-5xl font-semibold text-gray-900 mb-2">
                            Crafting Stunning Apps & Websites
                        </h1>
                        <h2 className="text-4xl font-semibold text-red-600 mb-6">
                            With Details, and Precision.
                        </h2>
                        <p className="text-md text-gray-600 mb-8">
                            Bring your vision to life with me, from design to launch, in record time.
                        </p>

                        <div className="overflow-visible flex flex-col sm:flex-row gap-4 mb-16">
                            <div
                                className="
                                    group inline-flex items-center gap-6 justify-center
                                    py-2 px-4 rounded-full text-base font-medium
                                    text-white bg-indigo-600
                                    border border-indigo-600/40
                                    shadow-[0_0_20px_rgba(79,70,229,0.25),_0_2px_4px_rgba(0,0,0,0.05)]
                                    hover:bg-indigo-700
                                    hover:shadow-[0_0_30px_rgba(79,70,229,0.55),_0_4px_8px_rgba(0,0,0,0.1)]
                                    transition-all duration-300 ease-in-out
                                    backdrop-blur-sm
                                  "
                            >
                                <a className="pl-1">See Plans & Pricing</a>
                                <div
                                    className="
                                      p-1 overflow-hidden border border-indigo-300/40
                                      bg-white/40 backdrop-blur-xl rounded-full
                                      shadow-[0_0_6px_rgba(255,255,255,0.4)]
                                      group-hover:shadow-[0_0_10px_rgba(255,255,255,0.6)]
                                      transition-transform duration-300 ease-in-out group-hover:rotate-45
                                    "
                                >
                                    <ArrowRight size={18} className="text-white" />
                                </div>
                            </div>

                            <div
                                // href="#"
                                className="group inline-flex rounded-full gap-6 items-center justify-center py-2 px-3 border border-gray-300 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
                                <a className="pl-1">
                                    Schedule a Call
                                </a>
                                <div className="p-1 overflow-hidden border border-gray-200 bg-white/40 backdrop-blur-xl rounded-full shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out group-hover:rotate-45">
                                    <ArrowRight size={18} className="text-gray-600" />
                                </div>
                            </div>
                        </div>

                        <div className="max-w-2xl relative mb-8">
                            <Marquee pauseOnHover className="relative z-0 [--duration:20s]">
                                {first.map((l) => LanguageMarquee(l))}
                            </Marquee>
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-20" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-20" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


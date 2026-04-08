import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { languages, LanguageMarquee } from "@/components/hero/languagemq";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGrid } from "@/components/hero/InteractiveGrid";
import { MagneticText } from "@/components/ui/MagneticText";

export default function Hero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);


    const first = languages.slice(0, Math.ceil(languages.length / 2));
    const second = languages.slice(Math.ceil(languages.length / 2));

    return (
        <section
            ref={sectionRef}
            className="relative min-h-dvh flex items-center justify-center bg-[#fafafa] pt-32 pb-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        >
        <InteractiveGrid />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="max-w-7xl mx-auto z-10 w-full">
                <div className="text-center">
                    <div
                        className={cn(
                            "flex justify-center transition-all duration-1000 ease-out",
                            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                        style={{ transitionDelay: isInView ? '200ms' : '0ms' }}
                    >
                        <div className="inline-flex px-4 py-2 gap-2 items-center rounded-full text-xs sm:text-sm font-medium bg-white border border-gray-200/80 shadow-sm mb-8 sm:mb-10">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="text-gray-600">Currently open to work, DM me!</span>
                        </div>
                    </div>
                    <MagneticText strength={30}>
                        <h1
                            className={cn(
                                "font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 mb-4 text-center leading-[1.1]",
                                "transition-all duration-1000 ease-out",
                                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                            style={{ transitionDelay: isInView ? '400ms' : '0ms' }}
                        >
                            Craft Stunning{" "}
                            <Highlighter action="circle" color="#87CEFA" isView={!isInView}>
                                Apps
                            </Highlighter>
                            {" "}  &amp; {" "}
                            <Highlighter action="highlight" color="#87CEFA" isView={!isInView}>
                                Websites
                            </Highlighter>
                        </h1>
                    </MagneticText>
                    
                    <MagneticText strength={20}>
                        <h2
                            className={cn(
                                "font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-indigo-600 mb-6 sm:mb-8 text-center leading-[1.1]",
                                "transition-all duration-1000 ease-out",
                                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                            style={{ transitionDelay: isInView ? '600ms' : '0ms' }}
                        >
                            With Details and Precision.
                        </h2>
                    </MagneticText>
                    <p
                        className={cn(
                            "text-lg sm:text-xl text-gray-500 mb-10 max-w-xl text-center mx-auto leading-relaxed",
                            "transition-all duration-1000 ease-out",
                            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                        style={{ transitionDelay: isInView ? '800ms' : '0ms' }}
                    >
                        Bring your vision to life with me, from design to launch, in record time.
                    </p>
                    <div
                        className={cn(
                            "flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16 items-stretch sm:items-center justify-center",
                            "transition-all duration-1000 ease-out",
                            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                        style={{ transitionDelay: isInView ? '1000ms' : '0ms' }}
                    >
                        <a
                            href="#showcase"
                            className="group inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                        >
                            <span>View Projects</span>
                            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#contact"
                            className="group inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full text-base font-medium text-gray-600 bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                        >
                            <span>Schedule a Call</span>
                            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                    </div>
                    <div
                        className={cn(
                            "relative",
                            "transition-all duration-1000 ease-out",
                            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                        style={{ transitionDelay: isInView ? '1200ms' : '0ms' }}
                    >
                        <Marquee pauseOnHover className="[--duration:25s]">
                            {first.map((l) => LanguageMarquee(l))}
                            {second.map((l) => LanguageMarquee(l))}
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}

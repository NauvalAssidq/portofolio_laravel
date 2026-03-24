import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Service {
    id: number;
    title: string;
    description: string;
    image: string;
    specialities: string[];
}

export const Services = ({ services = [] }: { services: Service[] }) => {
    const [activeId, setActiveId] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
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

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const getSpecialities = (service: Service) => {
        if (Array.isArray(service.specialities)) return service.specialities;
        return [];
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#fafafa] py-24 md:py-32 overflow-hidden"
            id="services"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className={cn(
                        "space-y-4 transition-all duration-1000 ease-out",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <h2 className="font-serif text-5xl md:text-7xl text-gray-900 leading-[0.9]">
                            What I Do
                        </h2>
                        <p className="text-gray-500 max-w-md text-lg">
                            Crafting digital experiences with precision, passion, and performance.
                        </p>
                    </div>
                </div>

                {services.length > 0 ? (
                    <div
                        className="flex flex-col lg:flex-row gap-4 lg:gap-2 h-auto lg:h-[600px] transition-all duration-1000 delay-300"
                        onMouseLeave={() => setActiveId(null)}
                    >
                        {services.map((service, index) => {
                            const isActive = activeId === service.id;
                            const specialities = getSpecialities(service);
                            return (
                                <div
                                    key={service.id}
                                    className={cn(
                                        "relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                                        "bg-white border border-gray-200 shadow-sm hover:shadow-lg",
                                        isActive ? "lg:flex-[3.5]" : "lg:flex-[1] hover:lg:flex-[1.2]",
                                        "h-auto lg:h-full",
                                        isActive ? "bg-gray-900 border-gray-900" : "bg-white"
                                    )}
                                    onMouseEnter={() => setActiveId(service.id)}
                                    onClick={() => setActiveId(isActive ? null : service.id)}
                                >
                                    <div className={cn(
                                        "absolute inset-0 transition-opacity duration-500 pointer-events-none",
                                        isActive ? "opacity-20" : "opacity-0"
                                    )}>
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover grayscale"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                                    </div>

                                    <div className={cn(
                                        "p-8 flex flex-col justify-between transition-all duration-500",
                                        "relative h-auto",
                                        "lg:absolute lg:inset-0 lg:h-full"
                                    )}>
                                        <div className="flex justify-between items-start mb-4 lg:mb-0">
                                            <span className={cn(
                                                "font-mono text-xl transition-colors duration-300",
                                                isActive ? "text-indigo-400" : "text-gray-300"
                                            )}>
                                                0{index + 1}
                                            </span>
                                            <ArrowUpRight className={cn(
                                                "w-6 h-6 transition-colors duration-300 transform",
                                                isActive ? "text-white rotate-45" : "text-gray-300",
                                                isActive ? "rotate-45" : "rotate-0"
                                            )} />
                                        </div>

                                        <div className="relative z-10">
                                            <h3 className={cn(
                                                "font-serif text-3xl md:text-4xl transition-colors duration-300 mb-4",
                                                isActive ? "text-white" : "text-gray-900",
                                                !isActive && "lg:-rotate-90 lg:origin-bottom-left lg:absolute lg:bottom-0 lg:left-8 lg:w-max lg:mb-0 transform translate-y-0"
                                            )}>
                                                {service.title}
                                            </h3>

                                            <div className={cn(
                                                "space-y-6 overflow-hidden transition-all duration-500 ease-in-out",
                                                isActive ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 lg:max-h-0 mt-0"
                                            )}>
                                                <p className="text-gray-300 leading-relaxed max-w-lg">
                                                    {service.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {specialities.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div
                        className={cn(
                            "w-full py-32 rounded-3xl bg-white border border-dashed border-gray-300 text-center relative overflow-hidden group hover:border-indigo-200 transition-colors duration-500",
                            "flex flex-col items-center justify-center",
                            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm group-hover:shadow-md">
                                <svg className="w-10 h-10 text-gray-400 group-hover:text-indigo-500 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-2xl text-gray-900 mb-2">Refining Service Offerings</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                I'm currently defining my core service packages to better serve your needs. Check back soon.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

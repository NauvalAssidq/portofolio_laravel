"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
    Eye,
    ScanSearch,
    MessagesSquare,
    Code2,
    CheckCircle
} from "lucide-react";

const useSpotlight = (divRef: React.RefObject<HTMLDivElement | null>) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return { position, opacity, handleMouseMove, handleMouseEnter, handleMouseLeave };
};

const BentoBox = ({
    className,
    icon: Icon,
    title,
    number,
    children,
    delay,
    isDark = false
}: {
    className?: string;
    icon: any;
    title: string;
    number: string;
    children: React.ReactNode;
    delay: number;
    isDark?: boolean;
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const { position, opacity, handleMouseMove, handleMouseEnter, handleMouseLeave } = useSpotlight(divRef);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative group overflow-hidden rounded-3xl bg-white border border-gray-200 p-8 h-full w-full",
                "transition-all duration-700 ease-out hover:shadow-2xl hover:border-gray-300",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.06), transparent 40%)`
                }}
            />

            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-300",
                        isDark ? "bg-gray-800 border-gray-700 group-hover:bg-indigo-900/30 group-hover:border-indigo-500/30" : "bg-gray-50 border-gray-100 group-hover:bg-indigo-50 group-hover:border-indigo-100"
                    )}>
                        <Icon className={cn(
                            "h-6 w-6 transition-colors duration-300",
                            isDark ? "text-gray-300 group-hover:text-indigo-400" : "text-gray-900 group-hover:text-indigo-600"
                        )} />
                    </div>
                    <span className={cn(
                        "font-serif text-6xl font-bold opacity-50 group-hover:opacity-100 transition-all duration-500 select-none",
                        isDark ? "text-gray-800 group-hover:text-gray-700" : "text-gray-200 group-hover:text-gray-300"
                    )}>
                        {number}
                    </span>
                </div>

                <h3 className={cn(
                    "text-xl font-bold mb-3 tracking-tight transition-colors duration-300",
                    isDark ? "text-white group-hover:text-indigo-300" : "text-gray-900 group-hover:text-indigo-600"
                )}>
                    {title}
                </h3>
                <p className={cn(
                    "leading-relaxed transition-colors duration-300",
                    isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-500 group-hover:text-gray-700"
                )}>
                    {children}
                </p>
            </div>
        </div>
    );
};

import * as Icons from "lucide-react";

interface Reason {
    id: number;
    title: string;
    description: string;
    icon: string;
    position: number;
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-ignore
    const Icon = Icons[name] || Icons.HelpCircle;
    return <Icon className={className} />;
};

const getBentoSpan = (index: number, total: number) => {
    let mdSpan = "md:col-span-1";
    if (total % 2 !== 0 && index === total - 1) {
        mdSpan = "md:col-span-2";
    }

    let lgSpan = "lg:col-span-1";
    if (total % 2 !== 0 && index === total - 1) {
        lgSpan = "lg:col-span-3";
    } else {
        const pattern = index % 4;
        if (pattern === 0 || pattern === 3) {
            lgSpan = "lg:col-span-2";
        } else {
            lgSpan = "lg:col-span-1";
        }
    }

    return `${mdSpan} ${lgSpan}`;
};

export const WhyChooseMe = ({ reasons = [] }: { reasons: Reason[] }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, { 
            threshold: 0.1,
            rootMargin: "0px 0px -150px 0px" 
        });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    if (reasons.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#fafafa] py-24 sm:py-32 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className={cn(
                        "space-y-4 transition-all duration-1000",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <h2 className="font-serif text-5xl md:text-7xl text-gray-900 leading-[0.9]">
                            Why Me?
                        </h2>
                        <p className="text-gray-500 max-w-md text-lg">
                            Beyond code. I bring a product mindset and pixel perfection to every project.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
                    {reasons.map((reason, index) => (
                        <div
                            key={reason.id}
                            className={cn(
                                "transition-all duration-700 h-full",
                                getBentoSpan(index, reasons.length),
                                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                            )}
                            style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                        >
                            <BentoBox
                                icon={(props: any) => <DynamicIcon name={reason.icon} {...props} />}
                                title={reason.title}
                                number={`0${index + 1}`}
                                delay={(index + 1) * 200}
                                isDark={index === reasons.length - 1}
                                className={cn(
                                    index === reasons.length - 1 ? "bg-gray-900 border-gray-900 hover:border-gray-800" : ""
                                )}
                            >
                                <span className={cn(
                                    "transition-colors",
                                    index === reasons.length - 1 ? "text-gray-400 group-hover:text-gray-300" : ""
                                )}>
                                    {reason.description}
                                </span>
                            </BentoBox>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";


interface PricingPlan {
    id: number;
    name: string;
    description: string;
    price_monthly: string | null;
    price_annually: string | null;
    currency: string;
    period: string;
    features: string[];
    cta_text: string;
    cta_link: string | null;
    is_popular: boolean;
}

export const Pricing = ({ plans = [] }: { plans: PricingPlan[] }) => {
    const [isAnnual, setIsAnnual] = useState(true);
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

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
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    // Fallback if no plans exist yet
    if (plans.length === 0) return null; // Or show custom empty state

    return (
        <section
            ref={sectionRef}
            id="pricing"
            className="w-full bg-white py-24 sm:py-32 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div
                    className={cn(
                        "text-center mb-16 transition-all duration-1000",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                >
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-[1.1] tracking-tight">
                        Simple Pricing
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
                        Transparent pricing with no hidden fees. Pay for what you need.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-1 bg-gray-100 rounded-full">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                !isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                            )}
                        >
                            Annually
                            <span className="ml-2 text-xs text-indigo-600 font-semibold">-20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan, index) => {
                        const price = isAnnual ? plan.price_annually : plan.price_monthly;

                        return (
                            <div
                                key={plan.id}
                                className={cn(
                                    "relative rounded-2xl p-8 transition-all duration-300 flex flex-col group",
                                    plan.is_popular
                                        ? "bg-gray-900 text-white ring-2 ring-gray-900 hover:ring-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1"
                                        : "bg-[#fafafa] border border-gray-200 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1",
                                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                {/* Recommended Badge */}
                                {plan.is_popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                                            Recommended
                                        </span>
                                    </div>
                                )}

                                {/* Plan Name */}
                                <h3 className={cn(
                                    "text-lg font-semibold mb-2 tracking-tight",
                                    plan.is_popular ? "text-white" : "text-gray-900"
                                )}>
                                    {plan.name}
                                </h3>

                                {/* Description */}
                                <p className={cn(
                                    "text-sm mb-6",
                                    plan.is_popular ? "text-gray-400" : "text-gray-500"
                                )}>
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mb-8">
                                    {price ? (
                                        <div className="flex items-baseline gap-1">
                                            <span className={cn(
                                                "text-4xl font-serif tracking-tight",
                                                plan.is_popular ? "text-white" : "text-gray-900"
                                            )}>
                                                {plan.currency === 'USD' ? '$' : 'IDR '}{Number(price).toLocaleString()}
                                            </span>
                                            <span className={cn(
                                                "text-sm",
                                                plan.is_popular ? "text-gray-400" : "text-gray-500"
                                            )}>
                                                {plan.period}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className={cn(
                                            "text-3xl font-serif tracking-tight",
                                            plan.is_popular ? "text-white" : "text-gray-900"
                                        )}>
                                            Custom Quote
                                        </span>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <a
                                    href={plan.cta_link || "#contact"}
                                    className={cn(
                                        "group w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 mb-8",
                                        plan.is_popular
                                            ? "bg-white text-gray-900 hover:bg-gray-100"
                                            : "bg-gray-900 text-white hover:bg-gray-800"
                                    )}
                                >
                                    <span>{plan.cta_text}</span>
                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </a>

                                {/* Features */}
                                <ul className="space-y-3 mt-auto">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className={cn(
                                                "w-4 h-4 mt-0.5 flex-shrink-0",
                                                plan.is_popular ? "text-indigo-400" : "text-indigo-600"
                                            )} />
                                            <span className={cn(
                                                "text-sm",
                                                plan.is_popular ? "text-gray-300" : "text-gray-600"
                                            )}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <p
                    className={cn(
                        "text-center text-sm text-gray-400 mt-12 transition-all duration-1000",
                        isInView ? "opacity-100" : "opacity-0"
                    )}
                    style={{ transitionDelay: "600ms" }}
                >
                    All prices are starting points. Final quote depends on project scope.
                </p>
            </div>
        </section>
    );
};

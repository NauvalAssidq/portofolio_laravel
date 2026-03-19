import React, { useEffect, useState } from "react";
import Navbar from "@/components/section/nav";
import Hero from "@/components/section/hero";
import { Showcase } from "@/components/section/project"
import { Services } from "@/components/section/service"
import { Pricing } from "@/components/section/pricing";
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import { SeoHead } from "@/components/SeoHead";
import { WhyChooseMe } from "@/components/section/choose";
import { Footer } from "@/components/section/footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";


export default function Home({ projects, services, pricings, chooses }: { projects: any[], services: any[], pricings: any[], chooses: any[] }) {
    const [isScrolled, setIsScrolled] = useState(false);

    // Enable smooth scrolling
    useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <SeoHead
                title="Home"
                description="Experience premium web development and award-winning design. I build high-performance applications with React, Laravel, and cutting-edge UI/UX."
            />
            <Navbar isScrolled={isScrolled} />
            <main>
                <Hero />
                <Showcase projects={projects} />
                <Services services={services} />
                <WhyChooseMe reasons={chooses} />
                <Pricing plans={pricings} />
            </main>
            <CookieConsentBanner />
            <Footer />
        </>
    );
}

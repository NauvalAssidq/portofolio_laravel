import React, { useEffect, useState } from "react";
import Navbar from "@/components/section/nav";
import Hero from "@/components/section/hero";
import { About } from "@/components/section/about";
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
    useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <SeoHead
                title="Nauval Dhonand Sidiq — Web Developer Banda Aceh"
                description="Nauval Dhonand Sidiq — Professional web developer based in Banda Aceh. Full-stack expertise in React, Laravel & modern UI/UX. Building premium websites and web applications for businesses in Banda Aceh and beyond."
                url="https://beethoval.dev"
            />
            <Navbar isScrolled={isScrolled} />
            <main>
                <Hero />
                <Showcase projects={projects} />
                <About />
                <Services services={services} />
                <WhyChooseMe reasons={chooses} />
                <Pricing plans={pricings} />
            </main>
            <CookieConsentBanner />
            <Footer />
        </>
    );
}

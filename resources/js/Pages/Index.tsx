import React, { useEffect, useState } from "react";
import Navbar from "@/components/section/nav";
import Hero from "@/components/section/hero";
import { About } from "@/components/section/about";
import { Showcase } from "@/components/section/project"
import { Services } from "@/components/section/service"
import { Pricing } from "@/components/section/pricing";
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import { WhyChooseMe } from "@/components/section/choose";
import { Footer } from "@/components/section/footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { SeoHead } from "@/components/SeoHead";
import { LocaleProvider } from "@/context/LocaleContext";


import { useLocale } from "@/context/LocaleContext";

const AppContent = ({ projects, services, pricings, chooses, isScrolled }: any) => {
    const { locale } = useLocale();
    return (
        <>
            <SeoHead title="Home" />
            <Navbar isScrolled={isScrolled} />
            <main>
                <Hero />
                <Showcase projects={projects[locale] || projects.id || []} />
                <About />
                <Services services={services[locale] || services.id || []} />
                <WhyChooseMe reasons={chooses[locale] || chooses.id || []} />
                <Pricing plans={pricings[locale] || pricings.id || []} />
            </main>
            <CookieConsentBanner />
            <Footer />
        </>
    );
};

export default function Home(props: any) {
    const [isScrolled, setIsScrolled] = useState(false);
    useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <LocaleProvider>
            <AppContent {...props} isScrolled={isScrolled} />
        </LocaleProvider>
    );
}

import React, { useEffect, useState } from "react";
import Navbar from "@/components/section/nav";
import Hero from "@/components/section/hero";
import {title} from "framer-motion/m";

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <head>
                <title>Homepage | Beethoval.dev</title>
            </head>
            <Navbar isScrolled={isScrolled} />
            <Hero/>
        </>
    );
}

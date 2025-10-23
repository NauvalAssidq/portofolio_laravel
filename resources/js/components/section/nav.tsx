import { cn } from "@/lib/utils";
import React from "react";
import { Layers2Icon } from "lucide-react"

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
    const navLinks = [
        { icon:<Layers2Icon className="text-indigo-600 text-sm"/>, name: "Pricing", href: "#" },
        { icon:<Layers2Icon className="text-indigo-600 text-sm"/>, name: "Showcase", href: "#" },
        { icon:<Layers2Icon className="text-indigo-600 text-sm"/>, name: "Contact", href: "#" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
            <nav
                className={cn(
                    "mx-auto flex items-center justify-between p-3 transition-all duration-300 ease-in-out",
                    isScrolled
                        ? "max-w-3xl rounded-full border border-gray-200/80 bg-white/80 shadow-md backdrop-blur-lg"
                        : "md:px-52 rounded-none bg-white border border-gray-200/80 transition duration-300 ease-in-out",
                )}
            >
                <a href="#" className="text-xl font-bold text-gray-900">
                    YourLogo
                </a>

                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="flex flex-row gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            <span>{link.icon}</span>
                            <span className="text-sm font-medium text-gray-900">{link.name}</span>
                        </a>
                    ))}
                </div>

                <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                    Get Started
                </a>
            </nav>
        </header>
    );
};

export default Navbar;

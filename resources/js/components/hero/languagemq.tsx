import {cn} from "@/lib/utils";
import {
    SiJavascript,
    SiTypescript,
    SiPython,
    SiGo,
    SiRust,
    SiCplusplus,
    SiSwift,
    SiKotlin,
    SiRuby,
    SiMysql,
    SiLaragon,
    SiCodeigniter,
    SiPhp
} from "react-icons/si";



export const languages = [
    {
        name: "JavaScript",
        tag: "Dynamic • Web",
        desc: "Ubiquitous for web apps & tooling",
        icon: <SiJavascript className="text-yellow-400 text-3xl" />,
    },
    {
        name: "TypeScript",
        tag: "Typed • Web",
        desc: "Type-safe JS for large codebases",
        icon: <SiTypescript className="text-blue-500 text-3xl" />,
    },
    {
        name: "Python",
        tag: "General • Data",
        desc: "Rapid prototyping, ML & scripting",
        icon: <SiPython className="text-yellow-300 text-3xl" />,
    },
    {
        name: "Kotlin",
        tag: "Android • JVM",
        desc: "Concise, safe alternative to Java",
        icon: <SiKotlin className="text-pink-500 text-3xl" />,
    },
    {
        name: "SQL",
        tag: "Databases",
        desc: "Query, join, and aggregate data",
        icon: <SiMysql className="text-sky-600 text-3xl" />,
    },
    {
        name: "Laragon",
        tag: "Environment",
        desc: "Php based development environment",
        icon: <SiLaragon className="text-blue-700 text-3xl" />,
    },
    {
        name: "Php",
        tag: "Static • Web",
        desc: "Php based development environment",
        icon: <SiPhp className="text-sky-800 text-3xl" />,
    },
    {
        name: "Code Igniter",
        tag: "MVC • Framework",
        desc: "Simple yet powerfull php framework",
        icon: <SiCodeigniter className="text-amber-600 text-3xl" />,
    },
];


export const LanguageMarquee = (l: (typeof languages)[number]) => (
    <figure
        key={l.name}
        className={cn(
            "relative cursor-pointer p-3 transition-all duration-300 group",
            "grayscale hover:grayscale-0",
            "hover:rounded-md hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-950/30"
        )}
    >
        <div className="flex items-center gap-3">
            <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
                <span aria-hidden>{l.icon}</span>
            </div>
            <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {l.name}
                </figcaption>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    {l.tag}
                </p>
            </div>
        </div>
    </figure>
);

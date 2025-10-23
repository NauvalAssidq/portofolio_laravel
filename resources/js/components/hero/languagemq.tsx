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
        name: "Go",
        tag: "Systems • Cloud",
        desc: "Simple, fast, great for services",
        icon: <SiGo className="text-cyan-500 text-3xl" />,
    },
    {
        name: "Rust",
        tag: "Systems • Safe",
        desc: "Memory safety with zero-cost abstractions",
        icon: <SiRust className="text-orange-600 text-3xl" />,
    },
    {
        name: "C++",
        tag: "Systems • Perf",
        desc: "High performance, close to metal",
        icon: <SiCplusplus className="text-blue-600 text-3xl" />,
    },
    {
        name: "Swift",
        tag: "Apple • Apps",
        desc: "iOS & macOS with modern ergonomics",
        icon: <SiSwift className="text-orange-500 text-3xl" />,
    },
    {
        name: "Kotlin",
        tag: "Android • JVM",
        desc: "Concise, safe alternative to Java",
        icon: <SiKotlin className="text-pink-500 text-3xl" />,
    },
    {
        name: "Ruby",
        tag: "Web • Scripting",
        desc: "Productive, expressive, great DX",
        icon: <SiRuby className="text-red-500 text-3xl" />,
    },
    {
        name: "SQL",
        tag: "Databases",
        desc: "Query, join, and aggregate data",
        icon: <SiMysql className="text-sky-600 text-3xl" />,
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

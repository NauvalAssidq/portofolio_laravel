import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    image: string;
    link: string;
}

const FloatingImage = ({
    image,
    isVisible,
    x,
    y
}: {
    image: string;
    isVisible: boolean;
    x: any;
    y: any;
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[60] hidden md:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{ x, y }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        opacity: { duration: 0.2 }
                    }}
                >
                    <div className="h-[300px] w-[400px] rounded-xl overflow-hidden shadow-2xl -translate-x-1/2 -translate-y-1/2">
                        {image ? (
                            <img
                                src={image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        ) : null}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ProjectRow = ({
    project,
    index,
    onHover,
    onLeave,
    onMouseMove
}: {
    project: Project;
    index: number;
    onHover: () => void;
    onLeave: () => void;
    onMouseMove: (e: React.MouseEvent) => void;
}) => {
    const rowRef = useRef<HTMLAnchorElement>(null);

    const { scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.a
            ref={rowRef}
            href={project.link || "#"}
            className="group block border-b border-gray-200 py-8 md:py-12 cursor-pointer relative overflow-hidden"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        >
            <div className="flex items-center justify-between">
                <motion.span
                    className="hidden md:block text-gray-300 font-mono text-sm w-16"
                    style={{ y }}
                >
                    {String(index + 1).padStart(2, '0')}
                </motion.span>

                <h3 className="md:hidden flex-1 font-serif text-4xl text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {project.title}
                </h3>

                <motion.h3
                    className="hidden md:block flex-1 font-serif text-4xl md:text-4xl lg:text-5xl text-gray-900 group-hover:text-indigo-600 transition-colors duration-300"
                    style={{ y }}
                >
                    {project.title}
                </motion.h3>

                <div className="hidden md:flex items-center gap-8">
                    <motion.span
                        className="text-gray-500 text-sm uppercase tracking-wider"
                        style={{ y }}
                    >
                        {project.category}
                    </motion.span>
                    <motion.span
                        className="text-gray-400 font-mono text-sm"
                        style={{ y }}
                    >
                        {project.year}
                    </motion.span>
                </div>

                <motion.div
                    className="ml-4 md:ml-8 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                >
                    <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:-rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </motion.div>
            </div>

            <div className="md:hidden mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span>{project.category}</span>
                <span className="text-gray-300">•</span>
                <span className="font-mono">{project.year}</span>
            </div>

            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-indigo-600"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
            />
        </motion.a>
    );
};

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=1200";

export const Showcase = ({ projects = [] }: { projects: Project[] }) => {
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            ref={sectionRef}
            id="showcase"
            className="relative bg-white py-24 md:py-32 overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                style={{ y: backgroundY }}
            >
                <span className="text-[20vw] font-serif text-gray-50 whitespace-nowrap">
                    WORKS
                </span>
            </motion.div>

            <div className="relative max-w-6xl mx-auto px-6">
                <motion.div
                    className="mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.0 }}
                >
                    <span className="text-indigo-600 font-medium text-sm uppercase tracking-wider mb-4 block">
                        Selected Work
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900">
                        Featured Projects
                    </h2>
                </motion.div>

                <div className="border-t border-gray-200">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <ProjectRow
                                key={project.id}
                                project={project}
                                index={index}
                                onHover={() => setHoveredProject(project)}
                                onLeave={() => setHoveredProject(null)}
                                onMouseMove={handleMouseMove}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="py-32 text-center"
                        >
                            <div className="w-24 h-24 mx-auto mb-8 bg-gray-50 rounded-full flex items-center justify-center relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border border-dashed border-gray-300 rounded-full"
                                />
                                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-3xl text-gray-900 mb-4">Curating Excellence</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg leading-relaxed">
                                I'm currently updating my portfolio with my latest case studies.
                                Great work takes time to showcase properly.
                            </p>
                            <a href="mailto:nauvalsidiq0427@gmail.com" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium">
                                Get in Touch
                            </a>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4 }}
                >
                    <a
                        href="#showcase"
                        className="inline-flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
                    >
                        <span className="text-lg">View All Projects</span>
                        <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </a>
                </motion.div>
            </div>

            <FloatingImage
                image={hoveredProject?.image || PLACEHOLDER_IMAGE}
                isVisible={!!hoveredProject}
                x={springX}
                y={springY}
            />
        </section>
    );
};

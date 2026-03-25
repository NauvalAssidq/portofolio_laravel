import React from "react";
import { motion } from "framer-motion";

export const About = () => {
    return (
        <section
            id="about"
            className="relative w-full bg-[#fafafa] py-32 md:py-64 overflow-hidden select-none"
        >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
                
                <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center font-serif text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.1] mb-12 tracking-tight max-w-5xl mx-auto"
                >
                    I believe in the power of <br className="hidden md:block" />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">invisible design</span> and <span className="italic text-gray-400">flawless execution</span>.
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center text-xl md:text-2xl text-gray-500 max-w-3xl font-light leading-relaxed mb-24"
                >
                    Hi, I'm <strong className="font-medium text-gray-800">Nauval Dhonand Sidiq</strong>, a web developer based in <strong className="font-medium text-gray-800">Banda Aceh</strong>. By bridging the gap between aesthetics and engineering, I build digital experiences that are blazingly fast, deeply intuitive, and utterly memorable.
                </motion.p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex flex-col items-center"
                    >
                        <span className="font-serif text-5xl md:text-8xl text-gray-900 tracking-tighter">
                            30<span className="text-indigo-500 align-top">+</span>
                        </span>
                        <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest mt-6">Projects Shipped</span>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="h-px w-24 md:h-24 md:w-px bg-gray-200/80" 
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex flex-col items-center"
                    >
                        <span className="font-serif text-5xl md:text-8xl text-gray-900 tracking-tighter">
                            3<span className="text-2xl md:text-5xl text-indigo-500 align-top ml-1">YRS</span>
                        </span>
                        <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest mt-6">Experience</span>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="h-px w-24 md:h-24 md:w-px bg-gray-200/80" 
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex flex-col items-center"
                    >
                        <span className="font-serif text-5xl md:text-8xl text-gray-900 tracking-tighter">
                            99<span className="text-2xl md:text-5xl text-indigo-500 align-top ml-1">%</span>
                        </span>
                        <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest mt-6">Satisfaction</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

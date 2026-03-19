import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const InteractiveGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configuration
        const spacing = 40; // Spacing between grid lines
        const dotRadius = 1;
        
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawGrid = () => {
             // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate grid dimensions
            const cols = Math.floor(canvas.width / spacing) + 1;
            const rows = Math.floor(canvas.height / spacing) + 1;

            ctx.lineWidth = 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    // Calculate distance from mouse
                    const dx = mousePos.x - x;
                    const dy = mousePos.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Interaction radius
                    const influenceRadius = 250;
                    
                    // Base opacity for the grid points
                    let opacity = 0.05;

                    // Increase opacity and create a slight pulling effect if near mouse
                    let drawX = x;
                    let drawY = y;

                    if (distance < influenceRadius) {
                        const influence = 1 - distance / influenceRadius;
                        opacity = 0.05 + (influence * 0.4); // Highlight near mouse
                        
                        // Very subtle warp toward mouse
                        const warpFactor = 5 * influence;
                        drawX += (dx / distance) * warpFactor;
                        drawY += (dy / distance) * warpFactor;
                    }

                    ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`; // Indigo color to match theme
                    ctx.beginPath();
                    ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw connecting lines if near mouse to create the "topography" mesh feel
                    if (distance < influenceRadius && i > 0 && j > 0) {
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
                        ctx.beginPath();
                        ctx.moveTo(drawX, drawY);
                        // Just connecting to top and left neighbor creates the grid
                        ctx.lineTo(drawX, drawY - spacing);
                        ctx.moveTo(drawX, drawY);
                        ctx.lineTo(drawX - spacing, drawY);
                        ctx.stroke();
                    }
                }
            }
        };

        const render = () => {
            drawGrid();
            animationFrameId = requestAnimationFrame(render);
        };

        resize();
        window.addEventListener("resize", resize);
        
        // Start animation loop
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => {
        // Handle both React synthetic events and native DOM events safely
        let clientX, clientY;
        
        if ('clientX' in e) {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        } else {
             clientX = (e as MouseEvent).clientX;
             clientY = (e as MouseEvent).clientY;
        }
        
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePos({
                x: clientX - rect.left,
                y: clientY - rect.top,
            });
        }
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 }); // Move off-screen
    };
    
    // Add global mouse listener so it tracks even over absolute positioned elements
    useEffect(() => {
         const handleGlobalMove = (e: MouseEvent) => {
             if(canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
             }
         }
         
         window.addEventListener('mousemove', handleGlobalMove);
         return () => window.removeEventListener('mousemove', handleGlobalMove);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ 
                background: 'transparent',
                // Adding a subtle radial gradient mask so the edges fade out smoothly
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
            }}
            onMouseLeave={handleMouseLeave}
        />
    );
};

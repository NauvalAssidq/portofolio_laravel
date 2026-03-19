import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const MagneticText = ({ 
    children, 
    className,
    strength = 30 // How far it can be pulled
}: { 
    children: React.ReactNode, 
    className?: string,
    strength?: number
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            // Calculate distance to center of element
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to center
            const distX = clientX - centerX;
            const distY = clientY - centerY;
            
            // Move proportional to distance, capped by strength
            // The closer you get to the edge, the stronger the pull
            const distance = Math.sqrt(distX * distX + distY * distY);
            // Optional: Only pull if within a certain distance, otherwise reset
            // if (distance > 200) { setPosition({x: 0, y: 0}); return; }

            setPosition({
                x: (distX / rect.width) * strength,
                y: (distY / rect.height) * strength,
            });
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div 
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={cn("relative inline-block transition-transform duration-300 ease-out", className)}
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px)`,
                willChange: "transform"
            }}
        >
            {children}
        </div>
    );
};

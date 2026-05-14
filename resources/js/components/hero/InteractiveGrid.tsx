import React from 'react';
import { cn } from '@/lib/utils';

export const InteractiveGrid = ({ className }: { className?: string }) => {
    return (
        <div className={cn("hidden sm:block absolute inset-0 pointer-events-none z-0", className)} style={{ overflow: 'visible' }}>
            <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    bottom: '-80px',
                    width: 'min(900px, 90vw)',
                    height: 'clamp(200px, 30vw, 400px)',
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)',
                }}
            />

            <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    bottom: '-40px',
                    width: 'min(650px, 70vw)',
                    height: 'clamp(120px, 18vw, 220px)',
                    backgroundImage:
                        'linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.3) 1px, transparent 1px)',
                    backgroundSize: 'clamp(24px, 3vw, 40px) clamp(24px, 3vw, 40px)',
                    maskImage: 'radial-gradient(ellipse at 50% 100%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 50% 100%, black 0%, transparent 70%)',
                }}
            />

            <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    bottom: '-60px',
                    width: 'min(500px, 55vw)',
                    height: 'clamp(60px, 10vw, 120px)',
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.4) 0%, transparent 70%)',
                }}
            />
        </div>
    );
};

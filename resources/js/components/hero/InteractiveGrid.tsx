import React from 'react';
import { cn } from '@/lib/utils';

export const InteractiveGrid = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 pointer-events-none z-0", className)} style={{ overflow: 'visible' }}>
            {/* Layer 1: Large radial blue beam/glow — the OUTER light, bleeds past section */}
            <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    bottom: '-80px',
                    width: '900px',
                    height: '400px',
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)',
                }}
            />

            {/* Layer 2: Grid pattern — SMALLER, sits inside the beam */}
            <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    bottom: '-40px',
                    width: '650px',
                    height: '220px',
                    backgroundImage:
                        'linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at 50% 100%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 50% 100%, black 0%, transparent 70%)',
                }}
            />

            {/* Layer 3: Intense core glow at the bottom edge, extends into next section */}
            <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    bottom: '-60px',
                    width: '500px',
                    height: '120px',
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.4) 0%, transparent 70%)',
                }}
            />
        </div>
    );
};

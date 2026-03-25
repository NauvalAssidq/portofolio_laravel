import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';


// @ts-ignore
import { route } from 'ziggy-js';

// @ts-ignore
window.route = route;

// @ts-ignore
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            // @ts-ignore
            import.meta.glob('./Pages/**/*.tsx')
        ),

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
                <App {...props} />
                <Analytics />
                <SpeedInsights />
            </>
        );
    },

    progress: {
        color: '#4B5563',
    },
});

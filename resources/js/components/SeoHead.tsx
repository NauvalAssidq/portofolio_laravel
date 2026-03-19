import { Head, usePage } from '@inertiajs/react';

interface SeoHeadProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export const SeoHead = ({
    title,
    description = "Award-winning portfolio showcasing premium web development and design services. Specializing in React, Laravel, and UI/UX.",
    keywords = "web development, ui/ux design, react, laravel, portfolio, frontend developer, full stack developer",
    image = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    url
}: SeoHeadProps) => {
    const { props } = usePage<any>();
    const siteName = props.app?.name || "Beethoval Portfolio";
    const appUrl = props.app?.url || "";

    const fullTitle = `${title} | ${siteName}`;
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : appUrl);

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={siteName} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={currentUrl} />

            {/* OpenGraph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Theme Color for mobile browsers */}
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
};

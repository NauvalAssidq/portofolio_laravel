import { Head, usePage } from '@inertiajs/react';

interface SeoHeadProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    imageAlt?: string;
    url?: string;
    twitterHandle?: string;
}

export const SeoHead = ({
    title,
    description = "Nauval Dhonand Sidiq — Professional web developer based in Banda Aceh. Full-stack expertise in React, Laravel & modern UI/UX.",
    keywords = "Nauval Dhonand Sidiq, developer website banda aceh, web dev banda aceh, web developer banda aceh, fullstack developer aceh, react developer, laravel developer, ui ux designer banda aceh, beethoval.dev",
    image = "https://raw.githubusercontent.com/NauvalAssidq/portofolio_laravel/refs/heads/main/public/storage/image.png",
    imageAlt = "Nauval Dhonand Sidiq — Web Developer Portfolio",
    url,
    twitterHandle,
}: SeoHeadProps) => {
    const { props } = usePage<any>();
    const siteName = "beethoval.dev";
    const appUrl = props.app?.url || "https://beethoval.vercel.app";

    const fullTitle = `${title} | ${siteName}`;
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : appUrl);

    return (
        <Head>
            <title>{fullTitle}</title>

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Nauval Dhonand Sidiq" />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <link rel="canonical" href={currentUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={imageAlt} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={imageAlt} />
            {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

            <meta name="theme-color" content="#0a0a0a" />
        </Head>
    );
};

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
    description = "Portfolio showcasing premium web development and design services by beethoval.dev.",
    keywords = "web development, ui/ux design, react, laravel, portfolio, frontend developer, full stack developer",
    image = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    imageAlt = "Portfolio preview",
    url,
    twitterHandle,
}: SeoHeadProps) => {
    const { props } = usePage<any>();
    const siteName = props.app?.name || "Beethoval Portfolio";
    const appUrl = props.app?.url || "";

    const fullTitle = `${title} | ${siteName}`;
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : appUrl);

    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteName,
        url: appUrl,
        description,
        sameAs: [],
    });

    return (
        <Head>
            <title>{title}</title>

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={siteName} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <link rel="canonical" href={currentUrl} />

            <meta name="google-site-verification" content="bf8489752947dfb6" />

            <meta httpEquiv="content-language" content="en" />

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

            <script type="application/ld+json">{structuredData}</script>
        </Head>
    );
};

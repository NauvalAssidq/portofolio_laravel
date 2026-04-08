<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>Nauval Dhonand Sidiq — Web Developer Banda Aceh | beethoval.dev</title>

    <meta name="description" content="Nauval Dhonand Sidiq — Professional web developer based in Banda Aceh. Full-stack expertise in React, Laravel & modern UI/UX. Building premium websites and web applications for businesses in Banda Aceh and beyond.">
    <meta name="keywords" content="Nauval Dhonand Sidiq, developer website banda aceh, web dev banda aceh, web developer banda aceh, jasa pembuatan website banda aceh, fullstack developer aceh, react developer banda aceh, laravel developer banda aceh, freelance web developer indonesia, ui ux designer banda aceh, beethoval.dev, portfolio developer aceh">
    <meta name="author" content="Nauval Dhonand Sidiq">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="https://beethoval.dev">

    <meta name="google-site-verification" content="yGK-t8YDL-XrOSoRZxDxUIf7mcmoUe4Tx_P9qxxv0Cs">

    {{-- Geo-targeting for Banda Aceh --}}
    <meta name="geo.region" content="ID-AC">
    <meta name="geo.placename" content="Banda Aceh">
    <meta name="geo.position" content="5.5483;95.3238">
    <meta name="ICBM" content="5.5483, 95.3238">
    <meta name="language" content="English">
    <meta http-equiv="content-language" content="en, id">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://beethoval.dev">
    <meta property="og:title" content="Nauval Dhonand Sidiq — Web Developer Banda Aceh | beethoval.dev">
    <meta property="og:description" content="Professional web developer based in Banda Aceh. Full-stack expertise in React, Laravel & modern UI/UX. Building premium websites and web applications.">
    <meta property="og:image" content="https://raw.githubusercontent.com/NauvalAssidq/portofolio_laravel/refs/heads/main/public/storage/image.png">
    <meta property="og:image:alt" content="Nauval Dhonand Sidiq — Web Developer Portfolio">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="beethoval.dev">
    <meta property="og:locale" content="en_US">
    <meta property="og:locale:alternate" content="id_ID">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Nauval Dhonand Sidiq — Web Developer Banda Aceh">
    <meta name="twitter:description" content="Professional web developer based in Banda Aceh. Full-stack expertise in React, Laravel & modern UI/UX design.">
    <meta name="twitter:image" content="https://raw.githubusercontent.com/NauvalAssidq/portofolio_laravel/refs/heads/main/public/storage/image.png">

    <meta name="theme-color" content="#0a0a0a">

    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

    {{-- Structured Data: WebSite --}}
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "beethoval.dev",
        "alternateName": ["Beethoval", "Nauval Dhonand Sidiq Portfolio"],
        "url": "https://beethoval.dev"
    }
    </script>

    {{-- Structured Data: Person --}}
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Nauval Dhonand Sidiq",
        "alternateName": "Beethoval",
        "url": "https://beethoval.dev",
        "description": "Professional web developer based in Banda Aceh, Indonesia. Specializing in React, Laravel, and modern UI/UX design.",
        "jobTitle": "Full-Stack Web Developer",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Banda Aceh",
            "addressRegion": "Aceh",
            "addressCountry": "ID"
        },
        "knowsAbout": ["Web Development", "React", "Laravel", "UI/UX Design", "JavaScript", "TypeScript", "Full-Stack Development"],
        "sameAs": [
            "https://github.com/NauvalAssidq"
        ]
    }
    </script>

    {{-- Structured Data: ProfessionalService --}}
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "beethoval.dev — Web Development Services",
        "description": "Professional web development services in Banda Aceh. Custom websites, web applications, and UI/UX design.",
        "url": "https://beethoval.dev",
        "areaServed": {
            "@type": "City",
            "name": "Banda Aceh"
        },
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Banda Aceh",
            "addressRegion": "Aceh",
            "addressCountry": "ID"
        }
    }
    </script>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>


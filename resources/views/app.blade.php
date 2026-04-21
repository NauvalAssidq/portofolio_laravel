<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Beethoval - Web Dev Aceh & Indonesia</title>

    <meta name="description" content="beethoval.dev — Web development studio founded by Nauval Dhonand Sidiq. We build premium websites and web applications with React, Laravel & modern UI/UX design for businesses in Aceh, Indonesia, and beyond.">
    <meta name="keywords" content="beethoval.dev, Nauval Dhonand Sidiq, web dev aceh, web dev indonesia, web developer aceh, web developer indonesia, jasa pembuatan website aceh, jasa web indonesia, fullstack developer indonesia, react developer indonesia, laravel developer indonesia, freelance web developer indonesia, ui ux designer indonesia, web development studio indonesia, portfolio developer indonesia, jasa website jakarta, developer website banda aceh">
    <meta name="author" content="Nauval Dhonand Sidiq">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    {{-- Canonical link fixed --}}
    <link rel="canonical" href="https://beethoval.dev">
    <!-- Beethoval.verce.app -->
    <meta name="google-site-verification" content="yGK-t8YDL-XrOSoRZxDxUIf7mcmoUe4Tx_P9qxxv0Cs">
    <!-- Beethoval.dev -->
    <meta name="google-site-verification" content="tS6otYTT_IvP3n7DoNVZxyjQtO9h7GlU2k9vyBPGme0" />

    {{-- Geo-targeting for Banda Aceh --}}
    <meta name="geo.region" content="ID-AC">
    <meta name="geo.placename" content="Banda Aceh">
    <meta name="geo.position" content="5.5483;95.3238">
    <meta name="ICBM" content="5.5483, 95.3238">
    <meta name="language" content="English">
    <meta http-equiv="content-language" content="en, id">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://beethoval.dev">
    <meta property="og:title" content="Beethoval - Web Dev Aceh & Indonesia">
    <meta property="og:description" content="beethoval.dev — Web development studio by Nauval Dhonand Sidiq. Premium websites & web applications built with React, Laravel & modern UI/UX in Aceh and Indonesia.">
    <meta property="og:image" content="https://raw.githubusercontent.com/NauvalAssidq/portofolio_laravel/refs/heads/main/public/storage/image.png">
    <meta property="og:image:alt" content="beethoval.dev — Web Development Studio by Nauval Dhonand Sidiq">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="beethoval.dev">
    <meta property="og:locale" content="en_US">
    <meta property="og:locale:alternate" content="id_ID">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Beethoval - Web Dev Aceh & Indonesia">
    <meta name="twitter:description" content="beethoval.dev — Web development studio by Nauval Dhonand Sidiq. Premium websites & apps serving Aceh and Indonesia.">
    <meta name="twitter:image" content="https://raw.githubusercontent.com/NauvalAssidq/portofolio_laravel/refs/heads/main/public/storage/image.png">

    <meta name="theme-color" content="#0a0a0a">

    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

    {{-- Script JSON-LD yang sudah di-escape (aman dari Blade error) --}}
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@type": "WebSite",
      "name": "beethoval.dev",
      "alternateName": "Beethoval",
      "url": "https://beethoval.dev/"
    }
    </script>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
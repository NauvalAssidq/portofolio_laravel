<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>Beethoval Portfolio</title>

    <meta name="description" content="Portfolio showcasing premium web development and design services by beethoval.dev.">
    <meta name="keywords" content="web development, ui/ux design, react, laravel, portfolio, frontend developer, full stack developer">
    <meta name="author" content="Beethoval">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="https://beethoval.vercel.app">

    <meta name="google-site-verification" content="yGK-t8YDL-XrOSoRZxDxUIf7mcmoUe4Tx_P9qxxv0Cs">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://beethoval.vercel.app">
    <meta property="og:title" content="Beethoval Portfolio">
    <meta property="og:description" content="Portfolio showcasing premium web development and design services by beethoval.dev.">
    <meta property="og:image" content="https://raw.githubusercontent.com/NauvalAssidq/portofolio_laravel/refs/heads/main/public/storage/image.png">
    <meta property="og:image:alt" content="Portfolio">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Beethoval Portfolio">
    <meta property="og:locale" content="en_US">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Beethoval Portfolio">
    <meta name="twitter:description" content="Portfolio showcasing premium web development and design services by beethoval.dev.">
    <meta name="twitter:image" content="https://raw.githubusercontent.com/NauvalAssidq/portofolio_laravel/refs/heads/main/public/storage/image.png">

    <meta name="theme-color" content="#0a0a0a">

    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>

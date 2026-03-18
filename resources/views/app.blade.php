<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {{-- Inertia SSR title / meta --}}
    <title inertia>Axcerulean's Space</title>

    {{-- Satoshi via Fontshare --}}
    <link rel="preconnect" href="https://api.fontshare.com" />
    <link
        href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        rel="stylesheet"
    />

    {{-- Vite assets (CSS + JS) --}}
    @viteReactRefresh
    @vite('resources/js/app.jsx')

    {{-- Inertia head --}}
    @inertiaHead
</head>
<body class="antialiased">
    @inertia
</body>
</html>
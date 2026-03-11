<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {{-- Inertia SSR title / meta --}}
    <title inertia>Laura González — Portfolio</title>

    {{-- Google Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
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

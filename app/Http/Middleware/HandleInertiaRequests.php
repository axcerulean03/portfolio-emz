<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

/**
 * HandleInertiaRequests
 *
 * This middleware runs on every Inertia request.
 * Data returned from share() is available as props in EVERY React page.
 *
 * Register in bootstrap/app.php:
 *   ->withMiddleware(function (Middleware $middleware) {
 *       $middleware->web(append: [HandleInertiaRequests::class]);
 *   })
 */
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     * Points to resources/views/app.blade.php
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version for cache-busting.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define shared props available to all pages.
     *
     * Add things like auth user, site settings, or notifications here.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],

            // 'auth' => [
            //     'user' => $request->user(),
            // ],
        ]);
    }
}

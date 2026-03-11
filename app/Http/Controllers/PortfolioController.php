<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * PortfolioController
 *
 * Serves the main portfolio pages via Inertia.
 * Add more methods as the portfolio grows (e.g. project detail pages).
 */
class PortfolioController
{
    /**
     * Home page — renders the full portfolio landing page.
     *
     * You can pass dynamic data from the database here, e.g.:
     *   'projects' => \App\Models\Project::latest()->get(),
     *
     * The React page falls back to static data if no projects are passed.
     */
    public function home(): Response
    {
        return Inertia::render('Home', [
            // 'projects' => \App\Models\Project::latest()->get(),
        ]);
    }
}

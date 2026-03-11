<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| All routes return Inertia responses, which render React pages from
| resources/js/pages/.
|
*/

// ── Portfolio pages ──────────────────────────────────────────────────────────

Route::get('/', [PortfolioController::class, 'home'])->name('home');

// Future pages — uncomment as you build them:
// Route::get('/projects/{slug}', [PortfolioController::class, 'project'])->name('project.show');
// Route::get('/about',           [PortfolioController::class, 'about'])->name('about');

// ── Forms ────────────────────────────────────────────────────────────────────

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

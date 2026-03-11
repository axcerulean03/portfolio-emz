<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

/**
 * ContactController
 *
 * Handles the portfolio contact form submission.
 * Redirects back to the home page with a flash message on success.
 */
class ContactController
{
    public function store(ContactRequest $request)
    {
        $validated = $request->validated();

        try {
            // ── Option A: Send via Laravel Mail ──────────────────────────────
            // Uncomment and configure MAIL_* in your .env file.
            //
            // Mail::to(config('portfolio.contact_email'))->send(
            //     new \App\Mail\ContactMessage($validated)
            // );

            // ── Option B: Log to storage/logs/laravel.log ────────────────────
            Log::info('Portfolio contact form submission', $validated);

            // ── Option C: Save to database ───────────────────────────────────
            // \App\Models\ContactSubmission::create($validated);

        } catch (\Exception $e) {
            Log::error('Contact form failed', ['error' => $e->getMessage()]);

            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }

        return redirect()->back()->with('success', 'Message received! I\'ll be in touch soon. 🎉');
    }
}

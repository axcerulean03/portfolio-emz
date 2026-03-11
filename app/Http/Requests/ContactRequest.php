<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * ContactRequest — validates the portfolio contact form.
 *
 * Validation errors are automatically forwarded back to the
 * Inertia page and surfaced in the form's `errors` prop.
 */
class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Public form — no auth required
    }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'min:2', 'max:100'],
            'email'   => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'    => 'Please tell me your name.',
            'email.required'   => 'I need your email to reply.',
            'email.email'      => 'That doesn\'t look like a valid email.',
            'message.required' => 'Don\'t forget to write your message!',
            'message.min'      => 'A bit more detail would be great (at least 10 characters).',
        ];
    }
}

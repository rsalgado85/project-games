<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', 'min:2'],
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'subject' => ['required', 'string', 'max:200', 'min:3'],
            'message' => ['required', 'string', 'min:20', 'max:2000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'name.min' => 'Name must be at least 2 characters.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'subject.required' => 'Please enter a subject.',
            'message.required' => 'Please enter your message.',
            'message.min' => 'Message must be at least 20 characters.',
            'message.max' => 'Message cannot exceed 2,000 characters.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => strip_tags(trim((string) $this->input('name'))),
            'subject' => strip_tags(trim((string) $this->input('subject'))),
        ]);
    }
}

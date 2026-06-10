<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchGamesRequest extends FormRequest
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
            'q' => ['sometimes', 'nullable', 'string', 'max:200', 'min:2'],
            'page' => ['sometimes', 'integer', 'min:1', 'max:500'],
            'page_size' => ['sometimes', 'integer', 'min:1', 'max:40'],
            'platforms' => ['sometimes', 'nullable', 'string', 'regex:/^[\d,]+$/'],
            'genres' => ['sometimes', 'nullable', 'string', 'regex:/^[a-z0-9,-]+$/'],
            'ordering' => ['sometimes', 'nullable', 'string', 'in:-added,-rating,-metacritic,-released,released,-updated,name,-name,rating,metacritic'],
            'dates' => ['sometimes', 'nullable', 'string', 'regex:/^\d{4}-\d{2}-\d{2},\d{4}-\d{2}-\d{2}$/'],
            'tags' => ['sometimes', 'nullable', 'string', 'regex:/^[a-z0-9,-]+$/'],
            'metacritic' => ['sometimes', 'nullable', 'string', 'regex:/^\d+,\d+$/'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'q.min' => 'Search query must be at least 2 characters.',
            'q.max' => 'Search query must not exceed 200 characters.',
            'page.max' => 'Page number cannot exceed 500.',
            'page_size.max' => 'Page size cannot exceed 40 results.',
            'platforms.regex' => 'Platforms must be comma-separated numeric IDs.',
            'dates.regex' => 'Dates must be in format YYYY-MM-DD,YYYY-MM-DD.',
        ];
    }
}

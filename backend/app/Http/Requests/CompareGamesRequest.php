<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompareGamesRequest extends FormRequest
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
            'game_a' => ['required', 'integer', 'min:1'],
            'game_b' => ['required', 'integer', 'min:1', 'different:game_a'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'game_a.required' => 'Please select the first game to compare.',
            'game_b.required' => 'Please select the second game to compare.',
            'game_b.different' => 'You must select two different games to compare.',
        ];
    }
}

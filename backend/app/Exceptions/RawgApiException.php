<?php

declare(strict_types=1);

namespace App\Exceptions;

use Exception;

class RawgApiException extends Exception
{
    public function __construct(
        string $message = 'Failed to fetch data from RAWG API',
        int $code = 503,
        private readonly ?array $context = null,
    ) {
        parent::__construct($message, $code);
    }

    public function getContext(): ?array
    {
        return $this->context;
    }

    /**
     * Render the exception as an HTTP response.
     */
    public function render(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => 'Service temporarily unavailable. Please try again later.',
            'error' => 'rawg_api_error',
        ], 503);
    }
}

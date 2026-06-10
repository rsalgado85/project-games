<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Requests\ContactRequest;
use App\Services\ContactService;

/**
 * ContactController
 *
 * Handles the contact form submission.
 * Validates input via ContactRequest.
 * Delegates delivery to ContactService.
 */
class ContactController extends Controller
{
    public function __construct(
        private readonly ContactService $contactService,
    ) {}

    /**
     * POST /api/contact
     */
    public function send(ContactRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $success = $this->contactService->send(
            name: $validated['name'],
            email: $validated['email'],
            subject: $validated['subject'],
            message: $validated['message'],
        );

        if (!$success) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to deliver your message. Please try again later.',
            ], 503);
        }

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent! I\'ll get back to you soon.',
        ]);
    }
}

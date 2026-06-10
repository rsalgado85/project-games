<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use App\DTOs\ContactDTO;

/**
 * ContactService
 *
 * Handles contact form message delivery.
 */
class ContactService
{
    public function send(string $name, string $email, string $subject, string $message): bool
    {
        // Sanitize inputs
        $name = strip_tags(trim($name));
        $email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
        $subject = strip_tags(trim($subject));
        $message = strip_tags(trim($message));

        $recipient = config('mail.contact_recipient', env('CONTACT_RECIPIENT_EMAIL', 'hello@example.com'));

        try {
            Mail::send([], [], function ($mail) use ($name, $email, $subject, $message, $recipient) {
                $mail->to($recipient)
                    ->replyTo($email, $name)
                    ->subject("[GameVault Contact] {$subject}")
                    ->html(
                        "<h2>New Contact Message</h2>" .
                        "<p><strong>From:</strong> {$name} ({$email})</p>" .
                        "<p><strong>Subject:</strong> {$subject}</p>" .
                        "<hr>" .
                        "<p>" . nl2br(htmlspecialchars($message)) . "</p>"
                    );
            });

            return true;
        } catch (\Exception) {
            // Log the error but don't expose details
            logger()->error('Contact form delivery failed', [
                'email' => $email,
                'subject' => $subject,
            ]);
            return false;
        }
    }
}

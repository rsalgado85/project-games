<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\GameRepositoryInterface;
use App\Repositories\GameRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register application services.
     * Bind interfaces to their implementations (Dependency Injection).
     */
    public function register(): void
    {
        // Repository binding — swap with a mock/stub for testing
        $this->app->bind(
            GameRepositoryInterface::class,
            GameRepository::class,
        );
    }

    /**
     * Bootstrap application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production
        if ($this->app->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
    }
}

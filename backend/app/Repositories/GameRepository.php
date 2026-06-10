<?php

declare(strict_types=1);

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\ConnectionException;
use App\Interfaces\GameRepositoryInterface;
use App\Exceptions\RawgApiException;

/**
 * GameRepository
 *
 * Handles all communication with the RAWG API.
 * Implements L1 cache (Laravel Cache, TTL 6h).
 * API Key is injected via config — never in source code.
 */
class GameRepository implements GameRepositoryInterface
{
    private string $baseUrl;
    private string $apiKey;
    private int $timeout;
    private array $cacheTtl;

    public function __construct()
    {
        $this->baseUrl = (string) config('rawg.base_url');
        $this->apiKey = (string) config('rawg.api_key');
        $this->timeout = (int) config('rawg.timeout', 10);
        $this->cacheTtl = (array) config('rawg.cache_ttl');
    }

    /**
     * {@inheritdoc}
     */
    public function getTrending(int $page = 1, int $pageSize = 20): array
    {
        $cacheKey = "rawg:trending:page:{$page}:size:{$pageSize}";
        $ttl = $this->cacheTtl['trending'];

        return Cache::remember($cacheKey, $ttl, function () use ($page, $pageSize) {
            return $this->request('/games', [
                'ordering' => '-added',
                'page' => $page,
                'page_size' => $pageSize,
            ]);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function getPopular(int $page = 1, int $pageSize = 20): array
    {
        $cacheKey = "rawg:popular:page:{$page}:size:{$pageSize}";
        $ttl = $this->cacheTtl['popular'];

        return Cache::remember($cacheKey, $ttl, function () use ($page, $pageSize) {
            return $this->request('/games', [
                'ordering' => '-rating',
                'page' => $page,
                'page_size' => $pageSize,
                'metacritic' => '60,100',
            ]);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function getTopRated(int $page = 1, int $pageSize = 20): array
    {
        $cacheKey = "rawg:top_rated:page:{$page}:size:{$pageSize}";
        $ttl = $this->cacheTtl['top_rated'];

        return Cache::remember($cacheKey, $ttl, function () use ($page, $pageSize) {
            return $this->request('/games', [
                'ordering' => '-metacritic',
                'page' => $page,
                'page_size' => $pageSize,
                'metacritic' => '80,100',
            ]);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function getUpcoming(int $page = 1, int $pageSize = 20): array
    {
        $cacheKey = "rawg:upcoming:page:{$page}:size:{$pageSize}";
        $ttl = $this->cacheTtl['upcoming'];

        return Cache::remember($cacheKey, $ttl, function () use ($page, $pageSize) {
            $today = now()->toDateString();
            $nextYear = now()->addYear()->toDateString();

            return $this->request('/games', [
                'dates' => "{$today},{$nextYear}",
                'ordering' => 'released',
                'page' => $page,
                'page_size' => $pageSize,
            ]);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function search(array $filters): array
    {
        $cacheKey = 'rawg:search:' . md5(serialize($filters));
        $ttl = $this->cacheTtl['search'];

        return Cache::remember($cacheKey, $ttl, function () use ($filters) {
            $params = array_filter([
                'search' => $filters['q'] ?? null,
                'page' => $filters['page'] ?? 1,
                'page_size' => $filters['page_size'] ?? 20,
                'platforms' => $filters['platforms'] ?? null,
                'genres' => $filters['genres'] ?? null,
                'ordering' => $filters['ordering'] ?? '-rating',
                'dates' => $filters['dates'] ?? null,
                'tags' => $filters['tags'] ?? null,
                'metacritic' => $filters['metacritic'] ?? null,
            ], fn ($v) => $v !== null && $v !== '');

            return $this->request('/games', $params);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function findById(int $id): array
    {
        $cacheKey = "rawg:game:{$id}";
        $ttl = $this->cacheTtl['detail'];

        return Cache::remember($cacheKey, $ttl, function () use ($id) {
            return $this->request("/games/{$id}");
        });
    }

    /**
     * {@inheritdoc}
     */
    public function getScreenshots(int $id): array
    {
        $cacheKey = "rawg:screenshots:{$id}";
        $ttl = $this->cacheTtl['detail'];

        return Cache::remember($cacheKey, $ttl, function () use ($id) {
            return $this->request("/games/{$id}/screenshots");
        });
    }

    /**
     * {@inheritdoc}
     */
    public function getMovies(int $id): array
    {
        $cacheKey = "rawg:movies:{$id}";
        $ttl = $this->cacheTtl['detail'];

        return Cache::remember($cacheKey, $ttl, function () use ($id) {
            return $this->request("/games/{$id}/movies");
        });
    }

    // ── Private Helpers ──────────────────────────────────────

    /**
     * Execute a request to RAWG API.
     *
     * @param array<string, mixed> $params
     * @return array<string, mixed>
     * @throws RawgApiException
     */
    private function request(string $endpoint, array $params = []): array
    {
        try {
            $response = Http::timeout($this->timeout)
                ->retry((int) config('rawg.retry_times', 2), (int) config('rawg.retry_sleep', 500))
                ->get($this->baseUrl . $endpoint, array_merge($params, [
                    'key' => $this->apiKey,
                ]));

            if ($response->failed()) {
                throw new RawgApiException(
                    message: "RAWG API error: {$response->status()} on {$endpoint}",
                    code: $response->status(),
                    context: ['endpoint' => $endpoint, 'status' => $response->status()],
                );
            }

            return $response->json() ?? [];

        } catch (ConnectionException $e) {
            throw new RawgApiException(
                message: 'Could not connect to RAWG API: ' . $e->getMessage(),
                code: 503,
                context: ['endpoint' => $endpoint],
            );
        }
    }
}

<?php

declare(strict_types=1);

namespace App\Services;

use App\Interfaces\GameRepositoryInterface;
use App\DTOs\GameDTO;
use App\DTOs\GameDetailDTO;

/**
 * GameService
 *
 * Orchestrates business logic for game data.
 * Transforms raw RAWG data into typed DTOs.
 */
class GameService
{
    public function __construct(
        private readonly GameRepositoryInterface $gameRepository,
    ) {}

    /**
     * Get trending games with pagination metadata.
     *
     * @return array{count: int, next: ?string, previous: ?string, results: array<GameDTO>}
     */
    public function getTrending(int $page = 1, int $pageSize = 20): array
    {
        $data = $this->gameRepository->getTrending($page, $pageSize);
        return $this->formatPaginatedResponse($data);
    }

    /**
     * Get popular games.
     */
    public function getPopular(int $page = 1, int $pageSize = 20): array
    {
        $data = $this->gameRepository->getPopular($page, $pageSize);
        return $this->formatPaginatedResponse($data);
    }

    /**
     * Get top-rated games by Metacritic score.
     */
    public function getTopRated(int $page = 1, int $pageSize = 20): array
    {
        $data = $this->gameRepository->getTopRated($page, $pageSize);
        return $this->formatPaginatedResponse($data);
    }

    /**
     * Get upcoming releases.
     */
    public function getUpcoming(int $page = 1, int $pageSize = 20): array
    {
        $data = $this->gameRepository->getUpcoming($page, $pageSize);
        return $this->formatPaginatedResponse($data);
    }

    /**
     * Search games with filters.
     *
     * @param array<string, mixed> $filters
     */
    public function search(array $filters): array
    {
        $data = $this->gameRepository->search($filters);
        return $this->formatPaginatedResponse($data);
    }

    /**
     * Get a game's full detail.
     */
    public function getGameDetail(int $id): GameDetailDTO
    {
        $data = $this->gameRepository->findById($id);
        $screenshots = $this->gameRepository->getScreenshots($id);

        return GameDetailDTO::fromArray($data, $screenshots);
    }

    /**
     * Compare two games side by side.
     *
     * @return array{gameA: GameDetailDTO, gameB: GameDetailDTO}
     */
    public function compareGames(int $gameAId, int $gameBId): array
    {
        [$gameA, $gameB] = [
            $this->getGameDetail($gameAId),
            $this->getGameDetail($gameBId),
        ];

        return compact('gameA', 'gameB');
    }

    /**
     * Get game trailers/movies from RAWG.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getGameMovies(int $id): array
    {
        $data = $this->gameRepository->getMovies($id);
        return $data['results'] ?? [];
    }

    // ── Private Helpers ──────────────────────────────────────

    /**
     * Format RAWG paginated response into typed DTOs.
     *
     * @param array<string, mixed> $data
     * @return array{count: int, next: ?string, previous: ?string, results: array<GameDTO>}
     */
    private function formatPaginatedResponse(array $data): array
    {
        $results = array_map(
            fn (array $item) => GameDTO::fromArray($item),
            $data['results'] ?? [],
        );

        return [
            'count' => (int) ($data['count'] ?? 0),
            'next' => $data['next'] ?? null,
            'previous' => $data['previous'] ?? null,
            'results' => $results,
        ];
    }
}

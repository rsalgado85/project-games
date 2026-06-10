<?php

declare(strict_types=1);

namespace App\Interfaces;

interface GameRepositoryInterface
{
    /**
     * Get currently trending games.
     */
    public function getTrending(int $page = 1, int $pageSize = 20): array;

    /**
     * Get all-time most popular games (by added count).
     */
    public function getPopular(int $page = 1, int $pageSize = 20): array;

    /**
     * Get highest Metacritic-scored games.
     */
    public function getTopRated(int $page = 1, int $pageSize = 20): array;

    /**
     * Get upcoming releases (future release dates, sorted ascending).
     */
    public function getUpcoming(int $page = 1, int $pageSize = 20): array;

    /**
     * Search games with optional filters.
     *
     * @param array<string, mixed> $filters
     */
    public function search(array $filters): array;

    /**
     * Get a single game by its RAWG ID.
     */
    public function findById(int $id): array;

    /**
     * Get screenshots for a game.
     */
    public function getScreenshots(int $id): array;

    /**
     * Get trailers/movies for a game.
     */
    public function getMovies(int $id): array;
}

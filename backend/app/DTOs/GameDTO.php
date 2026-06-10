<?php

declare(strict_types=1);

namespace App\DTOs;

/**
 * Game Data Transfer Object.
 * Represents a game list item (from RAWG /games endpoint).
 */
final class GameDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $slug,
        public readonly ?string $backgroundImage,
        public readonly ?string $released,
        public readonly float $rating,
        public readonly int $ratingTop,
        public readonly int $ratingsCount,
        public readonly ?int $metacritic,
        public readonly int $playtime,
        public readonly array $genres,
        public readonly array $platforms,
        public readonly array $tags,
        public readonly ?array $esrbRating,
        public readonly int $added,
    ) {}

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            id: (int) $data['id'],
            name: (string) $data['name'],
            slug: (string) $data['slug'],
            backgroundImage: $data['background_image'] ?? null,
            released: $data['released'] ?? null,
            rating: (float) ($data['rating'] ?? 0),
            ratingTop: (int) ($data['rating_top'] ?? 0),
            ratingsCount: (int) ($data['ratings_count'] ?? 0),
            metacritic: isset($data['metacritic']) ? (int) $data['metacritic'] : null,
            playtime: (int) ($data['playtime'] ?? 0),
            genres: $data['genres'] ?? [],
            platforms: $data['platforms'] ?? [],
            tags: $data['tags'] ?? [],
            esrbRating: $data['esrb_rating'] ?? null,
            added: (int) ($data['added'] ?? 0),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'background_image' => $this->backgroundImage,
            'released' => $this->released,
            'rating' => $this->rating,
            'rating_top' => $this->ratingTop,
            'ratings_count' => $this->ratingsCount,
            'metacritic' => $this->metacritic,
            'playtime' => $this->playtime,
            'genres' => $this->genres,
            'platforms' => $this->platforms,
            'tags' => $this->tags,
            'esrb_rating' => $this->esrbRating,
            'added' => $this->added,
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\DTOs;

/**
 * Game Detail DTO — full information for the game detail page.
 */
final class GameDetailDTO
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
        public readonly ?string $metacriticUrl,
        public readonly array $metacriticPlatforms,
        public readonly int $playtime,
        public readonly array $genres,
        public readonly array $platforms,
        public readonly array $tags,
        public readonly string $descriptionRaw,
        public readonly string $description,
        public readonly ?string $website,
        public readonly ?string $redditUrl,
        public readonly ?string $redditName,
        public readonly array $ratings,
        public readonly array $screenshots,
        public readonly array $stores,
        public readonly array $developers,
        public readonly array $publishers,
        public readonly ?array $clip,
        public readonly ?array $esrbRating,
        public readonly int $achievementsCount,
        public readonly int $gameSeriesCount,
        public readonly int $moviesCount,
        public readonly int $creatorsCount,
        public readonly int $additionsCount,
        public readonly int $parentsCount,
        public readonly string $updated,
    ) {}

    /**
     * @param array<string, mixed> $data
     * @param array<string, mixed> $screenshots
     */
    public static function fromArray(array $data, array $screenshots = []): self
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
            metacriticUrl: $data['metacritic_url'] ?? null,
            metacriticPlatforms: $data['metacritic_platforms'] ?? [],
            playtime: (int) ($data['playtime'] ?? 0),
            genres: $data['genres'] ?? [],
            platforms: $data['platforms'] ?? [],
            tags: $data['tags'] ?? [],
            descriptionRaw: (string) ($data['description_raw'] ?? ''),
            description: (string) ($data['description'] ?? ''),
            website: $data['website'] ?? null,
            redditUrl: $data['reddit_url'] ?? null,
            redditName: $data['reddit_name'] ?? null,
            ratings: $data['ratings'] ?? [],
            screenshots: $screenshots['results'] ?? ($data['short_screenshots'] ?? []),
            stores: $data['stores'] ?? [],
            developers: $data['developers'] ?? [],
            publishers: $data['publishers'] ?? [],
            clip: $data['clip'] ?? null,
            esrbRating: $data['esrb_rating'] ?? null,
            achievementsCount: (int) ($data['achievements_count'] ?? 0),
            gameSeriesCount: (int) ($data['game_series_count'] ?? 0),
            moviesCount: (int) ($data['movies_count'] ?? 0),
            creatorsCount: (int) ($data['creators_count'] ?? 0),
            additionsCount: (int) ($data['additions_count'] ?? 0),
            parentsCount: (int) ($data['parents_count'] ?? 0),
            updated: (string) ($data['updated'] ?? ''),
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
            'metacritic_url' => $this->metacriticUrl,
            'metacritic_platforms' => $this->metacriticPlatforms,
            'playtime' => $this->playtime,
            'genres' => $this->genres,
            'platforms' => $this->platforms,
            'tags' => $this->tags,
            'description_raw' => $this->descriptionRaw,
            'description' => $this->description,
            'website' => $this->website,
            'reddit_url' => $this->redditUrl,
            'reddit_name' => $this->redditName,
            'ratings' => $this->ratings,
            'screenshots' => $this->screenshots,
            'stores' => $this->stores,
            'developers' => $this->developers,
            'publishers' => $this->publishers,
            'clip' => $this->clip,
            'esrb_rating' => $this->esrbRating,
            'achievements_count' => $this->achievementsCount,
            'game_series_count' => $this->gameSeriesCount,
            'movies_count' => $this->moviesCount,
            'creators_count' => $this->creatorsCount,
            'additions_count' => $this->additionsCount,
            'parents_count' => $this->parentsCount,
            'updated' => $this->updated,
        ];
    }
}

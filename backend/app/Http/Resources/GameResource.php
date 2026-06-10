<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\DTOs\GameDTO;

/**
 * @mixin GameDTO
 */
class GameResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var GameDTO $this */
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

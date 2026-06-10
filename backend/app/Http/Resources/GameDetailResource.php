<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\DTOs\GameDetailDTO;

/**
 * @mixin GameDetailDTO
 */
class GameDetailResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var GameDetailDTO $this */
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

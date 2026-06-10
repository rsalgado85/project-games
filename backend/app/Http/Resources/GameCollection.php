<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GameCollection extends ResourceCollection
{
    public $collects = GameResource::class;

    /** Disable default Laravel `data` wrapping */
    public static $wrap = null;

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'count' => $this->additional['count'] ?? 0,
            'next' => $this->additional['next'] ?? null,
            'previous' => $this->additional['previous'] ?? null,
            'results' => $this->collection->toArray(),
        ];
    }

    public function with(Request $request): array
    {
        return [];
    }
}

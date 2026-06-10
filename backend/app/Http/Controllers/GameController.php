<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\SearchGamesRequest;
use App\Http\Requests\CompareGamesRequest;
use App\Http\Resources\GameCollection;
use App\Http\Resources\GameDetailResource;
use App\Services\GameService;
use App\Exceptions\RawgApiException;

/**
 * GameController
 *
 * Handles all game-related API endpoints.
 * Delegates business logic to GameService.
 * Applies rate limiting and input validation.
 */
class GameController extends Controller
{
    public function __construct(
        private readonly GameService $gameService,
    ) {}

    /**
     * GET /api/games/trending
     */
    public function trending(Request $request): JsonResponse
    {
        $page = (int) $request->integer('page', 1);
        $pageSize = min((int) $request->integer('page_size', 20), 40);

        $data = $this->gameService->getTrending($page, $pageSize);

        return response()->json($this->buildGamesResponse($request, $data));
    }

    /**
     * GET /api/games/popular
     */
    public function popular(Request $request): JsonResponse
    {
        $page = (int) $request->integer('page', 1);
        $pageSize = min((int) $request->integer('page_size', 20), 40);

        $data = $this->gameService->getPopular($page, $pageSize);

        return response()->json($this->buildGamesResponse($request, $data));
    }

    /**
     * GET /api/games/top-rated
     */
    public function topRated(Request $request): JsonResponse
    {
        $page = (int) $request->integer('page', 1);
        $pageSize = min((int) $request->integer('page_size', 20), 40);

        $data = $this->gameService->getTopRated($page, $pageSize);

        return response()->json($this->buildGamesResponse($request, $data));
    }

    /**
     * GET /api/games/upcoming
     */
    public function upcoming(Request $request): JsonResponse
    {
        $page = (int) $request->integer('page', 1);
        $pageSize = min((int) $request->integer('page_size', 20), 40);

        $data = $this->gameService->getUpcoming($page, $pageSize);

        return response()->json($this->buildGamesResponse($request, $data));
    }

    /**
     * GET /api/games/search
     */
    public function search(SearchGamesRequest $request): JsonResponse
    {
        $data = $this->gameService->search($request->validated());

        return response()->json($this->buildGamesResponse($request, $data));
    }

    /**
     * GET /api/games/{id}
     */
    public function show(int $id): JsonResponse
    {
        $game = $this->gameService->getGameDetail($id);
        return (new GameDetailResource($game))->response()->setStatusCode(200);
    }

    /**
     * GET /api/games/{id}/movies
     */
    public function movies(int $id): JsonResponse
    {
        $results = $this->gameService->getGameMovies($id);
        return response()->json(['results' => $results]);
    }

    /**
     * GET /api/games/compare?game_a={id}&game_b={id}
     */
    public function compare(CompareGamesRequest $request): JsonResponse
    {
        $gameAId = (int) $request->validated('game_a');
        $gameBId = (int) $request->validated('game_b');

        $result = $this->gameService->compareGames($gameAId, $gameBId);

        return response()->json([
            'gameA' => (new GameDetailResource($result['gameA']))->toArray($request),
            'gameB' => (new GameDetailResource($result['gameB']))->toArray($request),
        ]);
    }

    /**
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    private function buildGamesResponse(Request $request, array $data): array
    {
        $collection = new GameCollection(collect($data['results'] ?? []));
        $normalized = $collection->toArray($request);

        return [
            'count' => $data['count'] ?? 0,
            'next' => $data['next'] ?? null,
            'previous' => $data['previous'] ?? null,
            'results' => $normalized['results'] ?? [],
        ];
    }
}

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes — GameVault
|--------------------------------------------------------------------------
|
| All routes are prefixed with /api by bootstrap/app.php.
| All RAWG calls pass through here — the API key is never exposed.
|
*/

Route::prefix('games')->group(function () {
    Route::get('/trending', [GameController::class, 'trending'])
        ->name('games.trending');

    Route::get('/popular', [GameController::class, 'popular'])
        ->name('games.popular');

    Route::get('/top-rated', [GameController::class, 'topRated'])
        ->name('games.top-rated');

    Route::get('/upcoming', [GameController::class, 'upcoming'])
        ->name('games.upcoming');

    Route::get('/search', [GameController::class, 'search'])
        ->name('games.search');

    Route::get('/compare', [GameController::class, 'compare'])
        ->name('games.compare');

    Route::get('/{id}/movies', [GameController::class, 'movies'])
        ->name('games.movies')
        ->where('id', '[0-9]+');

    // Must come AFTER named routes to avoid {id} swallowing them
    Route::get('/{id}', [GameController::class, 'show'])
        ->name('games.show')
        ->where('id', '[0-9]+');
});

Route::post('/contact', [ContactController::class, 'send'])
    ->name('contact.send');

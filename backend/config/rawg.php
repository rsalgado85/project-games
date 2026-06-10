<?php

return [
    /*
    |--------------------------------------------------------------------------
    | RAWG API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the RAWG video games database API.
    | https://rawg.io/apidocs
    |
    */

    'api_key' => env('RAWG_API_KEY'),
    'base_url' => env('RAWG_BASE_URL', 'https://api.rawg.io/api'),

    /*
    |--------------------------------------------------------------------------
    | Cache TTL (seconds)
    |--------------------------------------------------------------------------
    */
    'cache_ttl' => [
        'trending' => 6 * 60 * 60,   // 6 hours
        'popular' => 6 * 60 * 60,    // 6 hours
        'top_rated' => 6 * 60 * 60,  // 6 hours
        'upcoming' => 3 * 60 * 60,   // 3 hours (updates more often)
        'search' => 30 * 60,         // 30 minutes
        'detail' => 12 * 60 * 60,    // 12 hours
    ],

    /*
    |--------------------------------------------------------------------------
    | Request Timeout
    |--------------------------------------------------------------------------
    */
    'timeout' => 10,
    'retry_times' => 2,
    'retry_sleep' => 500, // milliseconds
];

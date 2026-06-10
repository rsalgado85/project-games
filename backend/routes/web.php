<?php

use Illuminate\Support\Facades\Route;

// Health check
Route::get('/', fn () => response()->json(['status' => 'ok', 'app' => 'GameVault API']));
Route::get('/up', fn () => response()->json(['status' => 'ok']));

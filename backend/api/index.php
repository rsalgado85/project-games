<?php

/**
 * Vercel PHP Runtime Entry Point
 *
 * This file is the entry point for the Vercel PHP serverless function.
 * It bootstraps Laravel and handles each serverless invocation.
 */

define('LARAVEL_START', microtime(true));

require __DIR__ . '/../backend/vendor/autoload.php';

$app = require_once __DIR__ . '/../backend/bootstrap/app.php';

$app->handleRequest(Illuminate\Http\Request::capture());

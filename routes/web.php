<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
//    return view('welcome');
//});

Route::post('/login', [AuthController::class, 'login']); // public

Route::middleware('jwt.auth')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('posts', PostController::class);
});

Route::get('/{any}', function () {
    return file_get_contents(public_path('frontend/dist/frontend/index.html'));
})->where('any', '^(?!api).*$')->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

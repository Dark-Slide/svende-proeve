<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;

Route::get('/sanctum/csrf-cookie', fn () => response()->noContent());

Route::prefix('api')
    //Without csrf
    ->withoutMiddleware('Illuminate\Foundation\Http\Middleware\VerifyCsrfToken')
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate')
    ->group(base_path('routes/api.php'));


// Reroute all non-api, non-storage, non-asset requests to SPA entry point
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '^(?!api)(?!storage)(?!.*\.(js|css|map|json|txt|png|jpg|jpeg|svg|webp|ico|woff2?|ttf|eot)$).*')
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

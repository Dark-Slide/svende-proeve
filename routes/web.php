<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\GetController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;

Route::get('/sanctum/csrf-cookie', fn () => response()->noContent()); // Sanctum handles cookie

// Send all /api requests to api.php
Route::prefix('api')->group(base_path('routes/api.php'));

Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
        'password' => ['required', 'confirmed', Password::defaults()],
        // expects "password" and "password_confirmation"
    ]);

    $user = User::query()->create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => $data['password'], // auto-hashed by cast
    ]);

    Auth::login($user);                // start session
    $request->session()->regenerate(); // rotate session id

    return response()->json([
        'ok' => true,
        'user' => $user,
    ], 201);

});

Route::post('/login', function (Request $request) {

    $credentials = $request->validate(['email'=>'required|email','password'=>'required']);

    if (! Auth::attempt($credentials))
        return response()->json(['message' => 'Invalid credentials'], 422);

    $request->session()->regenerate();

    return response()->json(['ok' => true]);

});

Route::post('/logout', function (Request $request) {

    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return response()->json(['ok' => true]);

});

Route::get('/{any}', function () {
    return file_get_contents(public_path('frontend/dist/frontend/index.html'));
})->where('any', '^(?!api).*$')->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

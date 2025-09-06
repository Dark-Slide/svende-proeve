<?php

use App\Http\Controllers\Api\GetController;
use App\Http\Controllers\Api\PostController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;

// Frontpage
Route::get('/frontpage', [GetController::class, 'frontpage'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');


// Products
Route::get('/products', [GetController::class, 'products'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::get('/products/{id}', [GetController::class, 'product'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Get Products by category
Route::get('/products/category/{category}', [GetController::class, 'products_by_category'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Categories
Route::get('/categories', [GetController::class, 'categories'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Materials
Route::get('/materials', [GetController::class, 'materials'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Colors
Route::get('/colours', [GetController::class, 'colors'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Types
Route::get('/types', [GetController::class, 'types']);

// Create Product
Route::post('/product/create', [PostController::class, 'create_product'])
    ->withoutMiddleware('Illuminate\Foundation\Http\Middleware\VerifyCsrfToken');

// Orders
Route::get('/orders', [GetController::class, 'orders'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::get('/order/{id}', [GetController::class, 'order'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::get('/orders/user/{user_id}', [GetController::class, 'orders_by_user'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Create Order
Route::post('/order/create', [PostController::class, 'create_order'])
    ->withoutMiddleware('Illuminate\Foundation\Http\Middleware\VerifyCsrfToken');

// Order Lines
Route::get('/order_lines/order/{order_id}', [GetController::class, 'order_lines_by_order'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// User CSRF
Route::get('/user/sanctum/csrf-cookie', fn () => response()->noContent());

// User
Route::get('/user', fn (Request $r) => $r->user())->middleware('auth:sanctum');

Route::get('/user/{id}', [GetController::class, 'user'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::post('/user/login', function (Request $request) {

    $credentials = $request->validate(['email'=>'required|email','password'=>'required']);

    if (! Auth::attempt($credentials))
        return response()->json(['message' => 'Invalid credentials'], 422);

    $user = Auth::guard('web')->user();

    $request->session()->regenerate();

    return response()->json(['ok' => true]);

});

Route::post('/user/logout', function (Request $request) {

    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return response()->json(['ok' => true]);

});

Route::post('/user/register', function (Request $request) {

    $data = $request->validate([
        'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
        'password' => ['required', Password::defaults()],
        'confirmPassword' => ['required', Password::defaults()],
    ]);

    if ($data['password'] !== $data['confirmPassword']) {
        return response()->json(['message' => 'Passwords do not match'], 422);
    }

    // Hash password
    $data['password'] = bcrypt($data['password']);

    $user = User::query()->create([
        'name' => $data['name'] ?? 'test',
        'email' => $data['email'],
        'password' => $data['password'],
    ]);

    Auth::guard('web')->login($user);
    $request->session()->regenerate();

    return response()->json([
        'ok' => true,
        'user' => $user,
    ], 201);

});

Route::get('/user/session', function (Request $request) {

    $user = Auth::guard('web')->user();

    if (! $user ) {
        return response()->json(['user' => null]);
    }

    return response()->json(['user' => $user]);

})->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Profile
Route::get('/profile/{id}', [GetController::class, 'profile'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

<?php

use App\Http\Controllers\Api\GetController;
use App\Http\Controllers\Api\PostController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;

// Frontpage
Route::get('/frontpage', [GetController::class, 'frontpage']);

// Products
Route::get('/products', [GetController::class, 'products']);

// Redirect /products/profile to /profile/products
Route::get('/products/profile', fn () => redirect('/api/profile/products'));
Route::get('/products/profile/{id}', fn () => redirect('/api/profile/products'));

Route::get('/products/{id}', [GetController::class, 'product']);

Route::get('/products/category/{category}', [GetController::class, 'products_by_category']);

// Create Product
Route::post('/product/create', [PostController::class, 'create_product']);

// Categories
Route::get('/categories', [GetController::class, 'categories']);

// Materials
Route::get('/materials', [GetController::class, 'materials']);

// Colors
Route::get('/colours', [GetController::class, 'colors']);

// Types
Route::get('/types', [GetController::class, 'types']);

// Orders
Route::get('/orders', [GetController::class, 'orders']);

Route::get('/order/{id}', [GetController::class, 'order']);

Route::get('/orders/user/{user_id}', [GetController::class, 'orders_by_user']);

// Create Order
Route::post('/order/create', [PostController::class, 'create_order']);

// Order Lines
Route::get('/order_lines/order/{order_id}', [GetController::class, 'order_lines_by_order']);

// User CSRF
Route::get('/user/sanctum/csrf-cookie', fn () => response()->noContent());

// User
Route::get('/user', fn (Request $r) => $r->user())->middleware('auth:sanctum')
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Redirect user/profile to profile
Route::get('/user/profile', fn () => redirect('/api/profile'));

Route::get('/user/{id}', [GetController::class, 'user']);

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

})->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

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

    $user->media()->attach(7);

    $user->save();

    Auth::login($user);
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

});

// Profile
Route::get('/profile', function () {

    $user = Auth::guard('web')->user();

    $user = User::query()->find($user->id);

    if (! $user)
        return response()->json(['message' => 'User not found'], 404);

    $media = $user->media()->first();

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'image_url' => $media->path ?? null,
    ]);

});

Route::get('/profile/orders', [GetController::class, 'orders_by_profile'])->middleware('auth:sanctum');

Route::get('/profile/products', [GetController::class, 'products_by_profile']);

Route::get('/profile/sales', [GetController::class, 'sales_by_profile'])->middleware('auth:sanctum');

Route::get('/profile/{id}', function () {

    $user = Auth::guard('web')->user();

    $user = User::query()->find($user->id);

    if (!  $user )
        return response()->json(['message' => 'User not found'], 404);

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
    ]);

});

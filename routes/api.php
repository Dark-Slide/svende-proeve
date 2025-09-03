<?php

use App\Http\Controllers\Api\GetController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

// Frontpage
Route::get('/api/frontpage', [GetController::class, 'frontpage'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');


// Products
Route::get('/api/products', [GetController::class, 'products'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::get('/api/product/{id}', [GetController::class, 'product'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Get Products by category
Route::get('/api/products/category/{category}', [GetController::class, 'products_by_category'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Create Product
Route::post('/api/product/create', [PostController::class, 'create_product'])
    ->withoutMiddleware('Illuminate\Foundation\Http\Middleware\VerifyCsrfToken');

// Orders
Route::get('/api/orders', [GetController::class, 'orders'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::get('/api/order/{id}', [GetController::class, 'order'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::get('/api/orders/user/{user_id}', [GetController::class, 'orders_by_user'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// Create Order
Route::post('/api/order/create', [PostController::class, 'create_order'])
    ->withoutMiddleware('Illuminate\Foundation\Http\Middleware\VerifyCsrfToken');

// Order Lines
Route::get('/api/order_lines/order/{order_id}', [GetController::class, 'order_lines_by_order'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

// User
Route::get('/api/user/{id}', [GetController::class, 'user'])
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

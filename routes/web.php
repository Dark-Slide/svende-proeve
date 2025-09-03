<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;

Route::get('/sanctum/csrf-cookie', fn () => response()->noContent());

Route::prefix('api')
    ->group(base_path('routes/api.php'))
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
        'password' => ['required', 'confirmed', Password::defaults()],
    ]);

    $user = User::query()->create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => $data['password'],
    ]);

    Auth::login($user);
    $request->session()->regenerate();

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


// Reroute all non-api, non-storage, non-asset requests to SPA entry point
Route::get('/{any}', function () {
    return file_get_contents(public_path('/index.html'));
})->where('any', '^(?!api)(?!storage)(?!.*\.(js|css|map|json|txt|png|jpg|jpeg|svg|webp|ico|woff2?|ttf|eot)$).*')
    ->withoutMiddleware('Tymon\JWTAuth\Http\Middleware\Authenticate');

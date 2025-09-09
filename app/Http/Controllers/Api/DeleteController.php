<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class DeleteController extends Controller
{
    function delete_product($id) {

        $auth_user = request()->user();

        if ( ! $auth_user )
            return response()->json(['message' => 'Unauthorized'], 401);

        $product = Product::query()
            ->where('id', $id)
            ->where('user_id', $auth_user->id)
            ->first();

        if ( ! $product )
            return response()->json(['message' => 'Product not found'], 404);

        $product->delete();

        return response()->json(['message' => 'Product deleted'], 200);

    }
}

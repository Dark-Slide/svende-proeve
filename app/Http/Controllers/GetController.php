<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class GetController extends Controller
{

    function products()
    {

        $products = Product::all();

        return $products->toArray();

//        return response()->json([
//            'message' => 'Products fetched successfully',
//            'data' => [
//                $products->toArray()
//            ]
//        ]);

    }

    function product($id)
    {

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'message' => 'Product fetched successfully',
            'data' => $product->toArray()
        ]);

    }

    function user($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'message' => 'User fetched successfully',
            'data' => $user->toArray()
        ]);
    }

    function frontpage()
    {

        $products_featured = Product::query()
            ->where('type_id', 1) // Assuming type_id 1 is for frontpage products
            ->limit(10)
            ->get();

        $products_private = Product::query()
            ->where('type_id', 2) // Assuming type_id 2 is for featured products
            ->limit(10)
            ->get();

        return response()->json([
            'message' => 'Frontpage products fetched successfully',
            'data' => [
                'featured' => $products_featured->toArray(),
                'private' => $products_private->toArray()
            ]
        ]);

    }

}

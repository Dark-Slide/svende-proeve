<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class GetController extends Controller
{

    function frontpage()
    {

        $products_featured = Product::query()
            ->where('type_id', 1)
            ->limit(10)
            ->get();

        $products_private = Product::query()
            ->where('type_id', 2)
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

    function products()
    {

        $products = Product::all();

        return response()->json([
            'message' => 'Products fetched successfully',
            'data' => [
                $products->toArray()
            ]
        ]);

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

    function products_by_category($category)
    {
        $products = Product::query()->whereHas('categories', function ($query) use ($category) {
            $query->where('name', $category);
        })->get();

        return response()->json([
            'message' => 'Products fetched successfully',
            'data' => $products->toArray()
        ]);
    }

    // Orders
    function orders()
    {
        $orders = Order::all();

        return response()->json([
            'message' => 'Orders fetched successfully',
            'data' => $orders->toArray()
        ]);
    }

    function order( $id )
    {
        $order = Order::find( $id );

        if ( ! $order ) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json([
            'message' => 'Order fetched successfully',
            'data' => $order->toArray()
        ]);
    }

    function orders_by_user( $user_id )
    {
        $orders = Order::query()->where('user_id', $user_id)->get();

        return response()->json([
            'message' => 'Orders fetched successfully',
            'data' => $orders->toArray()
        ]);
    }

    // Order Lines
    function order_lines_by_order( $order_id )
    {
        $order = Order::find( $order_id );

        if ( ! $order ) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order_lines = $order->orderLines;

        return response()->json([
            'message' => 'Order lines fetched successfully',
            'data' => $order_lines->toArray()
        ]);
    }

    // User
    function user( $id )
    {
        $user = User::find( $id );

        if ( ! $user ) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'message' => 'User fetched successfully',
            'data' => $user->toArray()
        ]);
    }

}

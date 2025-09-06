<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Color;
use App\Models\Material;
use App\Models\Order;
use App\Models\Product;
use App\Models\Type;
use App\Models\User;

class GetController extends Controller
{

    function frontpage()
    {

        $products_featured = Product::query()
            ->where('type_id', 1)
            ->limit(3)
            ->get();

        $products_private = Product::query()
            ->where('type_id', 2)
            ->limit(3)
            ->get();

        return response()->json([
            'message' => 'Frontpage products fetched successfully',
            'data' => [
                'featured' => $products_featured->toArray(),
                'private' => $products_private->toArray()
            ]
        ]);

    }

    // Products
    function products()
    {

        $products = Product::query()
            ->select('id', 'title', 'description', 'price', 'is_used', 'width', 'height', 'depth', 'material_id', 'type_id', 'color_id')
            ->with('material', function ($query) {
                $query->select('id', 'name');
            })
            ->with('categories', function ($query) {
                $query->select('categories.id', 'categories.name');
            })
            ->with('type', function ($query) {
                $query->select('id', 'name');
            })
            ->with('color', function ($query) {
                $query->select('id', 'name');
            })
            ->limit(200)
            ->get();

        $collection = collect();

        foreach ($products as $product) {

            $object = new \stdClass();

            $object->id = $product->id;
            $object->title = $product->title;
            $object->description = $product->description;
            $object->price = $product->price;
            $object->width = $product->width;
            $object->height = $product->height;
            $object->depth = $product->depth;
            $object->material = $product->material->name;
            $object->type = $product->type->name;
            $object->colour = $product->color?->name;
            $object->condition = $product->is_used ? 'Brugt' : 'Ny';

            $collection->push($object);

        }

        return response()->json(
            $collection->toArray()
        );

//        return response()->json([
//            'message' => 'Products fetched successfully',
//            'data' => [
//                $products->toArray()
//            ]
//        ]);

    }

    function product($id)
    {

        $product = Product::query()
            ->select('id', 'title', 'description', 'price', 'is_used', 'width', 'height', 'depth', 'material_id', 'type_id', 'color_id')
            ->with('material', function ($query) {
                $query->select('id', 'name');
            })
            ->with('categories', function ($query) {
                $query->select('categories.id', 'categories.name');
            })
            ->with('type', function ($query) {
                $query->select('id', 'name');
            })
            ->with('color', function ($query) {
                $query->select('id', 'name');
            })
            ->where('id', $id)
            ->first();

        if ( ! $product ) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $object = new \stdClass();

        $object->id = $product->id;
        $object->title = $product->title;
        $object->description = $product->description;
        $object->price = $product->price;
        $object->width = $product->width;
        $object->height = $product->height;
        $object->depth = $product->depth;
        $object->material = $product->material->name;
        $object->type = $product->type->name;
        $object->colour = $product->color?->name;
        $object->condition = $product->is_used ? 'Brugt' : 'Ny';

        return response()->json(
            $object
        );

//        return response()->json([
//            'message' => 'Product fetched successfully',
//            'data' => $product->toArray()
//        ]);

    }

    function products_by_category($category)
    {
        $products = Product::query()->whereHas('categories', function ($query) use ($category) {
            $query->where('name', $category);
        })->get();

        return response()->json(
            $products->toArray()
        );

//        return response()->json([
//            'message' => 'Products fetched successfully',
//            'data' => $products->toArray()
//        ]);
    }

    // Orders
    function orders()
    {
        $orders = Order::all();

        return response()->json(
            $orders->toArray()
        );

//        return response()->json([
//            'message' => 'Orders fetched successfully',
//            'data' => $orders->toArray()
//        ]);
    }

    function order( $id )
    {
        $order = Order::query()->find( $id );

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
        $order = Order::query()->find( $order_id );

        if ( ! $order ) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order_lines = $order->orderLines;

        return response()->json([
            'message' => 'Order lines fetched successfully',
            'data' => $order_lines->toArray()
        ]);
    }

    // Categories
    function categories()
    {
        $categories = Category::all();

        $collection = collect();

        foreach ($categories as $category) {

            $object = new \stdClass();

            $object->id = $category->id;
            $object->name = $category->name;

            $collection->push($object);

        }

        return response()->json(
            $collection->toArray()
        );

//        return response()->json([
//            'message' => 'Categories fetched successfully',
//            'data' => $categories->toArray()
//        ]);
    }

    // Materials
    function materials()
    {
        $materials = Material::all();

        $collection = collect();

        foreach ($materials as $material) {

            $object = new \stdClass();

            $object->id = $material->id;
            $object->name = $material->name;

            $collection->push($object);

        }

        return response()->json(
            $collection->toArray()
        );

//        return response()->json([
//            'message' => 'Materials fetched successfully',
//            'data' => $materials->toArray()
//        ]);
    }

    // Colors
    function colors()
    {
        $colors = Color::all();

        $collection = collect();

        foreach ($colors as $color) {

            $object = new \stdClass();

            $object->id = $color->id;
            $object->name = $color->name;

            $collection->push($object);

        }

        return response()->json(
            $collection->toArray()
        );

//        return response()->json([
//            'message' => 'Colors fetched successfully',
//            'data' => $colors->toArray()
//        ]);
    }

    // Type
    function types()
    {
        $types = Type::all();

        $collection = collect();

        foreach ($types as $type) {

            $object = new \stdClass();

            $object->id = $type->id;
            $object->name = $type->name;

            $collection->push($object);

        }

        return response()->json(
            $collection->toArray()
        );

//        return response()->json([
//            'message' => 'Colors fetched successfully',
//            'data' => $colors->toArray()
//        ]);
    }

    // User
    function user( $id )
    {
        $user = User::query()->find( $id );

        if ( ! $user ) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'message' => 'User fetched successfully',
            'data' => $user->toArray()
        ]);
    }

}

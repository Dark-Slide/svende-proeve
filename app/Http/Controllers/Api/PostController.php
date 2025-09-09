<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\Material;
use App\Models\Media;
use App\Models\Order;
use App\Models\Product;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    function create_product() {

        $data = request()->all();

        $material = Material::query()
            ->where('id',  $data['materials'] ?? null)
            ->select('id')
            ->first();

        $type = Type::query()
            ->where('id', $data['types'] ?? null)
            ->select('id')
            ->first();

        $color = Color::query()
            ->where('id', $data['colors'] ?? null)
            ->select('id')
            ->first();


        $product = new Product();

        $product->title = $data['name'];
        $product->price = $data['price'];
        $product->description = $data['description'] ?? null;
        $product->height = $data['height'] ?? null;
        $product->width = $data['width'] ?? null;
        $product->depth = $data['depth'] ?? null;
        $product->is_used = $data['is_used'] ?? false;


        if ($material)
            $product->material()->associate($material);

        if ($type)
            $product->type()->associate($type);

        if ($color)
            $product->color()->associate($color);

        $product->save();

        // Save images if provided
        if ( isset( $data['image0'] ) ) {
            // Save image to storage images folder and get path

            $file = request()->file('image0');

            $filename = $data['imageUrl'];
            $path = $file->storeAs(public_path('assets/images'), $filename, 'local');

            $media = Media::query()->create([
                'path' => $path,
            ]);

            $product->media()->attach( $media );

        }

        $product->save();

        return 'Created product with ID: ' . $product->id;

    }

    function create_order()
    {

        $validated_data = request()->validate([
            'user_id' => 'required|integer|exists:users,id',
            'total_price' => 'required|numeric|min:0',
            'order_lines' => 'required|array|min:1',
            'order_lines.*.product_id' => 'required|integer|exists:products,id',
            'order_lines.*.quantity' => 'required|integer|min:1',
            'order_lines.*.price' => 'required|numeric|min:0',
        ]);

        $user = User::query()
            ->find($validated_data['user_id']);

        // Create a new order
        $order = new Order();

        $order->user()->associate($user);

        $order->price = $validated_data['total_price'];

        $order->save();

        // Create order lines
        foreach ( $validated_data['order_lines'] as $line ) {

            $order_line = new \App\Models\OrderLine();

            $order_line->order()->associate($order);

            $order_line->product_id = $line['product_id'];

            $order_line->quantity = $line['quantity'];

            $order_line->price = $line['price'];

            $order_line->save();

        }

        return response()->json(['message' => 'Order created successfully', 'order_id' => $order->id], 201);

    }
}

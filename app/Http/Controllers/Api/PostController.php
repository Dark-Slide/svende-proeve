<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    function create_product() {

        $data = request()->all();

        $product = new \App\Models\Product();

        $product->title = $data['title'];
        $product->price = $data['price'];
        $product->description = $data['description'] ?? null;
        $product->material_id = 1;
        $product->type_id = 1;
        $product->save();

        return 'Created product with ID: ' . $product->id;


    }
}

<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

class ProductsTest extends TestCase
{
    use RefreshDatabase;

    private string $products_uri = '/api/products';
    private string $product_uri  = '/api/product';
    private string $products_by_category_uri = '/api/products/category';

    public function test_index_returns_all_products_wrapped_in_single_array(): void
    {

        $count = 5;

        $material_id = DB::table('materials')->insertGetId([
            'name' => 'Leather',
        ]);

        $type_id = DB::table('types')->insertGetId([
            'name' => 'Couch',
        ]);

        for ($i = 1; $i <= $count; $i++) {
            DB::table('products')->insert([
                'type_id' => $type_id,
                'material_id' => $material_id,
                'title' => "Product $i",
                'description' => "Description for product $i",
                'price' => 10.00 * $i,
                'height' => 5.0 * $i,
                'width' => 3.0 * $i,
                'depth' => 2.0 * $i,
                'is_used' => rand(0, 1),
            ]);
        }

        $response = $this->getJson($this->products_uri)->assertOk();

        // Your controller returns: 'data' => [ $products->toArray() ]
        $response->assertJson(fn (AssertableJson $json) =>
            $json->where('message', 'Products fetched successfully')
                ->has('data', 1)
        );

        $this->assertCount($count, $response->json('data.0'));

    }

    public function test_show_returns_product_or_404(): void
    {

        $material_id = DB::table('materials')->insertGetId([
            'name' => 'Leather',
        ]);

        $type_id = DB::table('types')->insertGetId([
            'name' => 'Couch',
        ]);

        $id = DB::table('products')->insertGetId([
            'type_id' => $type_id,
            'material_id' => $material_id,
            'title' => 'Existing',
            'description' => "Description for existing product",
            'price' => 10.00,
            'height' => 5.0,
            'width' => 3.0,
            'depth' => 2.0,
            'is_used' => rand(0, 1),
        ]);

        $this->getJson("{$this->product_uri}/{$id}")
            ->assertOk()
            ->assertJsonPath('message', 'Product fetched successfully')
            ->assertJsonPath('data.id', $id);

        $this->getJson("{$this->product_uri}/999999")
            ->assertStatus(404)
            ->assertJson(['message' => 'Product not found']);

    }

    public function test_products_by_category_filters_correctly(): void
    {

        $category_1 = DB::table('categories')->insertGetId([
            'name' => 'U-Sofa',
        ]);

        $category_2 = DB::table('categories')->insertGetId([
            'name' => 'L-Sofa',
        ]);

        $material_id = DB::table('materials')->insertGetId([
            'name' => 'Leather',
        ]);

        $type_id = DB::table('types')->insertGetId([
            'name' => 'Couch',
        ]);

        $couch_ids = [];

        for ($i = 1; $i <= 3; $i++) {

            $product_id = DB::table('products')->insertGetId([
                'title' => "U-Couch $i",
                'description' => "Description for U-Couch $i",
                'price' => 10.00,
                'height' => 5.0,
                'width' => 3.0,
                'depth' => 2.0,
                'is_used' => rand(0, 1),
                'type_id' => $type_id,
                'material_id' => $material_id,
            ]);

            $couch_ids[] = $product_id;

            DB::table('categories_products')->insert([
                'category_id' => $category_1,
                'product_id' => $product_id,
            ]);

        }

        for ($i = 1; $i <= 2; $i++) {

            $product_id = DB::table('products')->insertGetId([
                'title' => "L-Couch $i",
                'description' => "Description for L-Couch $i",
                'price' => 10.00,
                'height' => 5.0,
                'width' => 3.0,
                'depth' => 2.0,
                'is_used' => rand(0, 1),
                'type_id' => $type_id,
                'material_id' => $material_id,
            ]);

            DB::table('categories_products')->insert([
                'category_id' => $category_2,
                'product_id' => $product_id,
            ]);

        }

        $response = $this->getJson("{$this->products_by_category_uri}/U-Sofa")->assertOk();

        $response->assertJson(fn (AssertableJson $json) =>
            $json->where('message', 'Products fetched successfully')
                ->has('data', 3)
        );

        $returnedIds = collect($response->json('data'))->pluck('id')->sort()->values()->all();

        sort($couch_ids);

        $this->assertSame($couch_ids, $returnedIds);

    }
}

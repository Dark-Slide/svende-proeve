<?php

namespace Database\Seeders;

use AllowDynamicProperties;
use App\Models\Category;
use App\Models\Material;
use App\Models\Product;
use App\Models\Type;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * @property Material $leather
 * @property Material $artificial_leather
 * @property Material $fabric
 * @property Type $u_sofa
 * @property Type $l_sofa
 * @property Type $sofa
 * @property Type $chaiselong
 * @property Category $rustic
 * @property Category $modern
 * @property Category $classic
 * @property Category $minimalist
 * @property Category $bohemian
 */
#[AllowDynamicProperties] class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->create_materials();

        $this->create_types();

        $this->create_categories();

        $this->create_new_products();

        $this->create_used_products();
    }

    private function create_types()
    {
        $this->u_sofa = Type::query()->create([
            'name' => 'U-Sofa',
        ]);

        $this->l_sofa = Type::query()->create([
            'name' => 'L-Sofa',
        ]);

        $this->sofa = Type::query()->create([
            'name' => 'Sofa',
        ]);

        $this->chaiselong = Type::query()->create([
            'name' => 'Chaiselong',
        ]);
    }

    private function create_materials()
    {
        $this->leather = Material::query()->create([
            'name' => 'Læder',
        ]);

        $this->artificial_leather = Material::query()->create([
            'name' => 'Kunstlæder',
        ]);

        $this->fabric = Material::query()->create([
            'name' => 'Stof',
        ]);
    }

    private function create_categories()
    {
        $this->rustic = Category::query()->create([
            'name' => 'Rustikt',
        ]);

        $this->modern = Category::query()->create([
            'name' => 'Moderne',
        ]);

        $this->classic = Category::query()->create([
            'name' => 'Klassisk',
        ]);

        $this->minimalist =Category::query()->create([
            'name' => 'Minimalistisk',
        ]);

        $this->bohemian = Category::query()->create([
            'name' => 'Boheme',
        ]);
    }

    private function create_new_products()
    {
        $product = Product::query()->create([
            'title' => 'Bred-U Sofa',
            'description' => 'En komfortabel og stilfuld sofa, perfekt til enhver stue.',
            'price' => 35000,
            'height' => 85,
            'width' => 300,
            'depth' => 200,
            'is_used' => false,
            'material_id' => $this->leather->id,
            'type_id' => $this->u_sofa->id,
        ]);

        $product->categories()->attach([$this->modern->id, $this->minimalist->id]);

        $product = Product::query()->create([
            'title' => 'Hjørne-L Sofa',
            'description' => 'En elegant L-formet sofa, der passer perfekt i hjørnet af dit rum.',
            'price' => 25000,
            'height' => 80,
            'width' => 220,
            'depth' => 150,
            'is_used' => false,
            'material_id' => $this->fabric->id,
            'type_id' => $this->l_sofa->id,
        ]);

        $product->categories()->attach([$this->classic->id, $this->bohemian->id]);

        $product = Product::query()->create([
            'title' => 'Moderne Sofa',
            'description' => 'En moderne sofa med rene linjer og et stilfuldt design.',
            'price' => 20000,
            'height' => 75,
            'width' => 180,
            'depth' => 90,
            'is_used' => false,
            'material_id' => $this->artificial_leather->id,
            'type_id' => $this->sofa->id,
        ]);

        $product->categories()->attach([$this->modern->id, $this->minimalist->id]);

        $product = Product::query()->create([
            'title' => 'Luksus Chaiselong',
            'description' => 'En luksuriøs chaiselong, der kombinerer komfort og stil.',
            'price' => 15000,
            'height' => 70,
            'width' => 160,
            'depth' => 100,
            'is_used' => false,
            'material_id' => $this->leather->id,
            'type_id' => $this->chaiselong->id,
        ]);

        $product->categories()->attach([$this->classic->id, $this->modern->id]);

    }

    private function create_used_products()
    {
        $product = Product::query()->create([
            'title' => 'Brugt Chaiselong',
            'description' => 'En brugt chaiselong i god stand, perfekt til afslapning.',
            'price' => 8000,
            'height' => 70,
            'width' => 160,
            'depth' => 100,
            'is_used' => true,
            'material_id' => $this->fabric->id,
            'type_id' => $this->chaiselong->id,
        ]);

        $product->categories()->attach([$this->rustic->id, $this->bohemian->id]);

        $product = Product::query()->create([
            'title' => 'Brugt Sofa',
            'description' => 'En brugt sofa med karakter, der tilføjer charme til dit hjem.',
            'price' => 12000,
            'height' => 80,
            'width' => 200,
            'depth' => 95,
            'is_used' => true,
            'material_id' => $this->leather->id,
            'type_id' => $this->sofa->id,
        ]);

        $product->categories()->attach([$this->classic->id, $this->rustic->id]);

        $product = Product::query()->create([
            'title' => 'Brugt L-Sofa',
            'description' => 'En brugt L-formet sofa, der stadig har masser af liv tilbage.',
            'price' => 18000,
            'height' => 85,
            'width' => 220,
            'depth' => 150,
            'is_used' => true,
            'material_id' => $this->artificial_leather->id,
            'type_id' => $this->l_sofa->id,
        ]);

        $product->categories()->attach([$this->modern->id, $this->minimalist->id]);

        $product = Product::query()->create([
            'title' => 'Brugt U-Sofa',
            'description' => 'En brugt U-formet sofa, der stadig tilbyder masser af komfort.',
            'price' => 22000,
            'height' => 90,
            'width' => 300,
            'depth' => 200,
            'is_used' => true,
            'material_id' => $this->fabric->id,
            'type_id' => $this->u_sofa->id,
        ]);

        $product->categories()->attach([$this->bohemian->id, $this->rustic->id]);
    }
}

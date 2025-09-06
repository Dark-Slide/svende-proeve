<?php

namespace Database\Seeders;

use AllowDynamicProperties;
use App\Models\Category;
use App\Models\Color;
use App\Models\Material;
use App\Models\Product;
use App\Models\Type;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * @property Material $leather
 * @property Material $artificial_leather
 * @property Material $fabric
 * @property Type $u_sofa
 * @property Type $l_sofa
 * @property Type $sofa
 * @property Type $chaiselong
 * @property Type $modular_sofa
 * @property Category $rustic
 * @property Category $modern
 * @property Category $classic
 * @property Category $minimalist
 * @property Category $bohemian
 *
 * @property Color[]|Collection $colors
 * @property Product[]|Collection $products
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

        $this->create_colors();

        $this->create_products();

    }

    private function create_types()
    {

        $types = [
            ['name' => 'U-Sofa'],
            ['name' => 'L-Sofa'],
            ['name' => 'Sofa'],
            ['name' => 'Chaiselong'],
            ['name' => 'Modulsofa'],

            // Extra
            ['name' => 'Hjørnesofa'],
            ['name' => 'Sovesofa'],
            ['name' => 'Sovesofa med chaiselong'],
            ['name' => 'Hjørnesofa med chaiselong'],
            ['name' => 'Open-end sofa'],
            ['name' => 'Open-end hjørnesofa'],
            ['name' => '2-personers sofa'],
            ['name' => '2,5-personers sofa'],
            ['name' => '3-personers sofa'],
            ['name' => '4-personers sofa'],
            ['name' => 'Loveseat'],
            ['name' => 'Reclinersofa'],
            ['name' => 'Elektrisk reclinersofa'],
            ['name' => 'Biografsofa'],
            ['name' => 'Buet sofa'],
            ['name' => 'Rund sofa'],
            ['name' => 'Divansofa'],
            ['name' => 'Daybed'],
            ['name' => 'Futonsofa'],
            ['name' => 'Havesofa'],
            ['name' => 'Pallesofa'],
            ['name' => 'XL-sofa'],
            ['name' => 'Sofa med opbevaring']
        ];

        foreach ($types as $type) {
            Type::query()->create($type);
        }

    }

    private function create_materials()
    {
        $materials = [
            ['name' => 'Læder'],
            ['name' => 'Kunstlæder'],
            ['name' => 'Stof'],

            // Extra
            ['name' => 'Velour'],
            ['name' => 'Bouclé'],
            ['name' => 'Mikrofiber'],
            ['name' => 'Chenille'],
            ['name' => 'Fløjl (Corduroy)'],
            ['name' => 'Uld'],
            ['name' => 'Uldmix'],
            ['name' => 'Hør'],
            ['name' => 'Hørmix'],
            ['name' => 'Bomuld'],
            ['name' => 'Bomuldsmix'],
            ['name' => 'Teddy'],
            ['name' => 'Performance-stof'],
            ['name' => 'Vandafvisende stof'],
            ['name' => 'Genbrugstekstil'],
            ['name' => 'Anilinlæder'],
            ['name' => 'Semi-anilinlæder'],
            ['name' => 'Nubuck-læder'],
            ['name' => 'Bonded læder'],
            ['name' => 'PU-læder'],
        ];

        foreach ($materials as $material) {
            Material::query()->create($material);
        }
    }

    private function create_categories()
    {

        $categories = [
            ['name' => 'Rustikt'],
            ['name' => 'Moderne'],
            ['name' => 'Klassisk'],
            ['name' => 'Minimalistisk'],
            ['name' => 'Boheme'],

            // Extra
            ['name' => 'Skandinavisk'],
            ['name' => 'Industriel'],
            ['name' => 'Retro'],
            ['name' => 'Vintage'],
            ['name' => 'Mid-century'],
            ['name' => 'Landlig'],
            ['name' => 'Urban'],
            ['name' => 'Japandi'],
            ['name' => 'Wabi-sabi'],
            ['name' => 'Eklektisk'],
            ['name' => 'Art Deco'],
            ['name' => 'Glam'],
            ['name' => 'Coastal'],
            ['name' => 'Mediterranean'],
            ['name' => 'New Nordic'],
            ['name' => 'Hotelstil'],
            ['name' => 'Sustainable'],
            ['name' => 'Compact living'],
            ['name' => 'Organisk'],
        ];

        foreach ($categories as $category) {
            Category::query()->create($category);
        }
    }

    private function create_colors()
    {
        $colors = [
            ['name' => 'Rød', 'hex_code' => '#FF0000'],
            ['name' => 'Blå', 'hex_code' => '#0000FF'],
            ['name' => 'Grøn', 'hex_code' => '#00FF00'],
            ['name' => 'Gul', 'hex_code' => '#FFFF00'],
            ['name' => 'Sort', 'hex_code' => '#000000'],
            ['name' => 'Hvid', 'hex_code' => '#FFFFFF'],
            ['name' => 'Grå', 'hex_code' => '#808080'],
            ['name' => 'Brun', 'hex_code' => '#A52A2A'],
            ['name' => 'Orange', 'hex_code' => '#FFA500'],
            ['name' => 'Lilla', 'hex_code' => '#800080'],

            // Extra
            ['name' => 'Beige', 'hex_code' => '#F5F5DC'],
            ['name' => 'Sand', 'hex_code' => '#C2B280'],
            ['name' => 'Creme', 'hex_code' => '#FFFDD0'],
            ['name' => 'Offwhite', 'hex_code' => '#F8F8F8'],
            ['name' => 'Lysegrå', 'hex_code' => '#D3D3D3'],
            ['name' => 'Mørkegrå', 'hex_code' => '#555555'],
            ['name' => 'Antracit', 'hex_code' => '#303030'],
            ['name' => 'Koksgrå', 'hex_code' => '#1F1F1F'],
            ['name' => 'Marineblå', 'hex_code' => '#003366'],
            ['name' => 'Mørkeblå', 'hex_code' => '#00008B'],
            ['name' => 'Himmelsblå', 'hex_code' => '#87CEEB'],
            ['name' => 'Petrol', 'hex_code' => '#006D77'],
            ['name' => 'Turkis', 'hex_code' => '#40E0D0'],
            ['name' => 'Teal', 'hex_code' => '#008080'],
            ['name' => 'Oliven', 'hex_code' => '#808000'],
            ['name' => 'Skovgrøn', 'hex_code' => '#228B22'],
            ['name' => 'Mørkegrøn', 'hex_code' => '#006400'],
            ['name' => 'Sennep', 'hex_code' => '#FFDB58'],
            ['name' => 'Terracotta', 'hex_code' => '#E2725B'],
            ['name' => 'Rust', 'hex_code' => '#B7410E'],
            ['name' => 'Cognac', 'hex_code' => '#A0522D'],
            ['name' => 'Bordeaux', 'hex_code' => '#800000'],
            ['name' => 'Vinrød', 'hex_code' => '#8B0000'],
            ['name' => 'Støvet rosa', 'hex_code' => '#D8A7B1'],
            ['name' => 'Lyserød', 'hex_code' => '#FFC0CB'],
            ['name' => 'Lavendel', 'hex_code' => '#E6E6FA'],
            ['name' => 'Mørkelilla', 'hex_code' => '#4B0082'],
            ['name' => 'Kobber', 'hex_code' => '#B87333'],
            ['name' => 'Taupe', 'hex_code' => '#483C32'],
        ];

        foreach ($colors as $color) {
            Color::query()->create($color);
        }

        $this->colors = Color::all();
    }

    private function create_products(): void
    {
        $types = Type::all();
        $materials = Material::all();
        $categories = Category::all();

        $this->products = collect();

        foreach ($types as $type) {
            foreach ($materials as $material) {
                foreach ($this->colors as $color) {
                    $name = $this->buildProductName($type->name, $material->name, $color->name);



                    $product = new Product();

                    $product->is_used = (bool)rand(0, 1);

                    // Set price based on new/used
                    // Round the price to the nearest 0
                    if ($product->is_used) {
                        $basePrice = rand(3000, 15000);
                        $discount = rand(10, 40); // 10% to 40% discount for used
                        $price = $basePrice * (1 - $discount / 100);
                    } else {
                        $price = rand(5000, 20000);
                    }

                    $product->price = round($price, -2); // Round to nearest 100

                    $product->width = rand(150, 400);
                    $product->height = rand(70, 120);
                    $product->depth = rand(70, 200);
                    $product->title = $name;
                    $product->type_id = $type->id;
                    $product->material_id = $material->id;
                    $product->color_id = $color->id;
                    $product->description = $this->buildDescription($type->name, $material->name, $color->name);

                    $this->products->push($product);

                }

            }

        }

        // Chunk insert products
        foreach ($this->products->chunk(500) as $chunk) {
            Product::query()->insert($chunk->toArray());
        }

        $this->products = Product::all();

        // Attach categories to products
        foreach ($this->products as $product) {

            $product->categories()->sync(
                $categories->random(rand(1, min(3, $categories->count())))
                    ->pluck('id')
                    ->toArray()
            );

        }
    }

    private function buildProductName(string $type, string $material, string $color): string
    {
        return sprintf('%s – %s – %s', $type, mb_strtolower($material), mb_strtolower($color));
    }

    private function buildDescription(string $type, string $material, string $color): string
    {
        $tpl = $this->pick($this->descTemplates);

        $adjective = $this->pick($this->adjectives);
        $useCase   = $this->pick($this->useCases);

        $featureList = $this->pickMany($this->features, random_int(1, 3));
        $featureSentence = $this->featuresToSentence($featureList);

        $cta = random_int(0, 1) ? $this->pick($this->ctas) : ''; // CTA er valgfri

        $replacements = [
            '{type}'             => mb_strtolower($type),
            '{material}'         => mb_strtolower($material),
            '{color}'            => mb_strtolower($color),
            '{adjective}'        => $adjective,
            '{use_case}'         => $useCase,
            '{feature_sentence}' => $featureSentence,
            '{cta}'              => $cta,
        ];

        $text = trim(preg_replace('/\s+/', ' ', strtr($tpl, $replacements)));

        if (!preg_match('/[.!?]$/u', $text)) {
            $text .= '.';
        }

        return $text;
    }

    private function pick(array $arr)
    {
        return $arr[array_rand($arr)];
    }

    private function pickMany(array $arr, int $n): array
    {
        $n = max(1, min($n, count($arr)));
        $keys = array_rand($arr, $n);
        if (!is_array($keys)) { $keys = [$keys]; }
        return array_values(array_intersect_key($arr, array_flip($keys)));
    }

    private function featuresToSentence(array $features): string
    {
        if (empty($features)) return '';
        if (count($features) === 1) {
            return 'Med ' . $features[0] . '.';
        }
        $last = array_pop($features);
        return 'Med ' . implode(', ', $features) . ' og ' . $last . '.';
    }

    private array $descTemplates = [
        // Brug {type}, {material}, {color}, {adjective}, {use_case}, {feature_sentence}, {cta}
        'Elegant {type} i {material}. {feature_sentence} Passer godt til {use_case}.',
        'Skabt til hverdagen — {type} i {material}. Farve: {color}. {feature_sentence} {cta}',
        'Tidløst valg: {type} i {material}, {adjective} og robust. Vist her i {color}. {feature_sentence}',
        '{type} i {material} med fokus på komfort. {feature_sentence} Ideel til {use_case}.',
        'Fleksibelt design: {type} i {material}. {feature_sentence} Farve: {color}. {cta}',
        'Luksuriøs {type} i {material}. {feature_sentence} Perfekt til {use_case}.',
    ];

    private array $adjectives = [
        'blød', 'slidstærk', 'vedligeholdelsesvenlig', 'indbydende',
        'luftig', 'støttende', 'luksuriøs', 'praktisk',
        'pladsbesparende', 'familievenlig', 'tidløs', 'skandinavisk'
    ];

    private array $useCases = [
        'stuen', 'hjemmets samlingspunkt', 'hyggelige aftener',
        'hverdagsbrug', 'film- og spilleaftener', 'små rum',
        'store familier', 'afslappede weekender'
    ];

    private array $features = [
        'aftageligt betræk', 'koldskumspolstring', 'dybe sæder',
        'fast komfort', 'blød komfort', 'ben i egetræ', 'ben i metal',
        'modulopbygget design', 'vendbar chaiselong', 'opbevaring under sæde',
        'nem rengøring', 'pilling-resistent stof', 'OEKO-TEX® certificeret',
        'ridsefast læderfinish', 'høj ryg for ekstra støtte', 'bløde armlæn',
        'ekstra brede sædehynder', 'pyntepuder medfølger'
    ];

    private array $ctas = [
        'Fås i flere farver og størrelser.',
        'Mulighed for ekstra moduler.',
        'Bestil gratis stofprøver.',
        'Produceret på bestilling.'
    ];
}

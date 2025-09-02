<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories_products', function (Blueprint $table) {

            $table->id();

            $table->foreignIdFor(\App\Models\Category::class)
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignIdFor(\App\Models\Product::class)
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories_products');
    }
};

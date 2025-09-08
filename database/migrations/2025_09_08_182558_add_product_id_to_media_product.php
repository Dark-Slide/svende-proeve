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
        Schema::table('media_product', function (Blueprint $table) {

            $table->unsignedBigInteger('media_id')->after('updated_at');

            $table->unsignedBigInteger('product_id')->after('media_id');

            $table->foreign('media_id')->references('id')->on('media')->onDelete('cascade');

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media_product', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropColumn('product_id');
            $table->dropForeign(['media_id']);
            $table->dropColumn('media_id');
        });
    }
};

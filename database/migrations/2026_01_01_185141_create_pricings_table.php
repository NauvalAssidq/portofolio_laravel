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
        Schema::create('pricings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price_monthly', 10, 2)->nullable();
            $table->decimal('price_annually', 10, 2)->nullable();
            $table->string('currency')->default('USD');
            $table->string('period')->default('/ project');
            $table->json('features')->nullable();
            $table->string('cta_text')->default('Get Started');
            $table->string('cta_link')->nullable(); // Can be #call or active link
            $table->boolean('is_popular')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricings');
    }
};

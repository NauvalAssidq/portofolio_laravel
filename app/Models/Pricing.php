<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pricing extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price_monthly',
        'price_annually',
        'currency',
        'period',
        'features',
        'cta_text',
        'cta_link',
        'is_popular',
    ];

    protected $casts = [
        'features' => 'array',
        'is_popular' => 'boolean',
        'price_monthly' => 'decimal:2',
        'price_annually' => 'decimal:2',
    ];
}

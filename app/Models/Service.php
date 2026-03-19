<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['title', 'description', 'image', 'specialities'];

    protected $casts = [
        'specialities' => 'array',
    ];
}

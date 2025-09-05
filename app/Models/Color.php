<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Color
 * @property int $id
 * @property string $name
 * @property string $hex_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Color extends Model
{
    protected $fillable = ['name', 'hex_code'];
}

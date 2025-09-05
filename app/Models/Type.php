<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Type extends Model
{

    protected $fillable = [
        'name'
    ];

    protected $casts = [
        'name' => 'string'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

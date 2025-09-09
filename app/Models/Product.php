<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property float $price
 * @property boolean $is_used
 * @property int $width
 * @property int $height
 * @property int $depth
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property Material $material
 * @property Type $type
 * @property Color $color
 * @property User $user
 *
 * @property \Illuminate\Database\Eloquent\Collection|Category[] $categories
 * @property \Illuminate\Database\Eloquent\Collection|Media[] $media
 * @property \Illuminate\Database\Eloquent\Collection|OrderLine[] $orderLines
 */
class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'is_used',
        'width',
        'height',
        'depth',
        'material_id',
        'type_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_used' => 'boolean',
    ];

    public function material()
    {
        return $this->belongsTo(Material::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'categories_products');
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function media()
    {
        return $this->belongsToMany(Media::class);
    }

    public function user()
    {

        return $this->belongsTo(User::class);

    }
}

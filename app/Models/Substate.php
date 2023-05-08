<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Substate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','desc'
    ];

    public function doctor(){
        return $this->hasMany(VSubstateTreatment::class);
    }
}

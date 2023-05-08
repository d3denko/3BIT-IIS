<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VSubstateTreatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'from','till','substate_id','treatment_id'
    ];

    public function substate(){
        return $this->hasOne(Substate::class);
    }

    public function treatment(){
        return $this->hasOne(Treatment::class);
    }
}

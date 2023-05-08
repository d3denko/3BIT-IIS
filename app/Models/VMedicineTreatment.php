<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VMedicineTreatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'from','till','medicine_id','treatment_id','removal','main'
    ];

    public function medicine(){
        return $this->hasOne(Medicine::class);
    }

    public function treatment(){
        return $this->hasOne(Treatment::class);
    }
}

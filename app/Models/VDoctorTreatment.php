<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VDoctorTreatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'from','till','doctor_id','treatment_id'
    ];

    public function doctor(){
        return $this->hasOne(User::class);
    }

    public function treatment(){
        return $this->hasOne(Treatment::class);
    }
}

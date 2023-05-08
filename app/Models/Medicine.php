<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','type','version','company_id'
    ];

    public function company(){
        return $this->hasOne(Company::class);
    }

    public function in_treatment(){
        return $this->hasMany(VMedicineTreatment::class);
    }
}

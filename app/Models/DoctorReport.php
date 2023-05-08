<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Treatment;

class DoctorReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'Func','Pain','Swell','Sediment','CRP','VAS','DAS','VASp','date'
    ];

    public function treatment()
    {
        return $this->hasOne(Treatment::class);
    }
}


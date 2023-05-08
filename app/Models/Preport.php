<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Treatment;

class Preport extends Model
{
    use HasFactory;

    protected $fillable = [
        'Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8','Q9','Q10','Q11','Q12','Q13','Q14','Q15','Q16','Q17','Q18','Q19','Q20',
        'B11','B12','B13','B14','B15','B16','B17','B18','B19','B110','B111','B112','B113',
        'B21','B22','B23','B24','B25','B26','B27','B28',
        'Other','HQp','date'
    ];

    public function treatment()
    {
        return $this->hasOne(Treatment::class);
    }
}

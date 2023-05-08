<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Preport;
use DoctorReport;

class Treatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'age','gender','diagnosis','start','next_visit'
    ];

    public function being_treated(){
        return $this->hasOne(User::class);
    }

    public function patient_reports()
    {
        return $this->hasMany(Preport::class);
    }

    public function doctor_reports()
    {
        return $this->hasMany(DoctorReport::class);
    }

    public function medicines(){
        return $this->hasMany(VMedicineTreatment::class);
    }

    public function doctors(){
        return $this->hasMany(VDoctorTreatment::class);
    }

    public function substates(){
        return $this->hasMany(VSubstateTreatment::class);
    }
}

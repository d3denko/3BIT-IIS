<?php
/**
 * author: xhoril01
 * requests: from company view, medicine list
 * view: company view
 */
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Log;
use Exepction;
use Illuminate\Support\Facades\Auth;
use DateTime;

//Controller that settles requests from company view
class CompanyController extends Controller
{
    //Get one graph value
    private function GetGraphvalue($date,$med_id){
        $dr = DB::table('medicines')
            ->where('medicines.id',$med_id)
            ->join('v_medicine_treatments','v_medicine_treatments.medicine_id','=','medicines.id')
            ->where('v_medicine_treatments.from','<=',$date->format('Y-m-d'))
            ->where(function ($q) use($date) {
                $q->where('v_medicine_treatments.till','>=',$date->format('Y-m-d'))->orWhere('v_medicine_treatments.till','=',NULL);
            })
            ->count();
        return $dr;
    }

    //Get graph of single medicine
    public function GetSingleMedicineGraph($med_id){
        $name = DB::table('medicines')->where('medicines.id',$med_id)->value('medicines.name');
        $from = DB::table('medicines')
                ->where('medicines.id',$med_id)
                ->join('v_medicine_treatments','v_medicine_treatments.medicine_id','=','medicines.id')
                ->orderBy('v_medicine_treatments.from', 'ASC')
                ->value('v_medicine_treatments.from');
        $till = date_create_from_format('Y-m-d',date('Y-m-d'));
        if($from == NULL){
            $returner = array(
                "dates" => [$till->format('Y-m-d'),$till->format('Y-m-d'),$till->format('Y-m-d')],
                "values" => [0,0,0],
                "name" => $name
            );
    
            $returner = (object)$returner;
    
            return response()->json($returner);
        }
        $from = date_create_from_format('Y-m-d',$from);
        $dates = \App\Http\Controllers\GraphController::get_graph_dates($from,$till);
        $values=[];
        foreach($dates as $curdate){
            array_push($values,$this->GetGraphvalue($curdate,$med_id));
        }
        $returner = array(
            "dates" => $dates,
            "values" => $values,
            "name" => $name
        );

        $returner = (object)$returner;

        return response()->json($returner);
    }

    //Get data about single medicine
    public function GetSingleMedicineData($med_id){
        $med_data = DB::table('medicines')->where('medicines.id',$med_id)->get(['medicines.name','medicines.version','medicines.type']);
    
        $name = ((array)$med_data[0])['name'];
        $version = ((array)$med_data[0])['version'];
        $type = ((array)$med_data[0])['type'];
        $ac = DB::table('users')
                    ->where('users.allow_data_usage',1)
                    ->join('treatments','treatments.patient_id','=','users.id')
                    ->join('v_medicine_treatments','v_medicine_treatments.treatment_id','=','treatments.id')
                    ->where('v_medicine_treatments.medicine_id',$med_id)
                    ->where('v_medicine_treatments.till','=',NULL)
                    ->count();
        $pc = DB::table('users')
                    ->where('users.allow_data_usage',1)
                    ->join('treatments','treatments.patient_id','=','users.id')
                    ->join('v_medicine_treatments','v_medicine_treatments.treatment_id','=','treatments.id')
                    ->where('v_medicine_treatments.medicine_id',$med_id)
                    ->where('v_medicine_treatments.till','!=',NULL)
                    ->count();
        $ret = array(
            'id' => $med_id,
            'name' => $name,
            'version' => $version,
            'type' => $type,
            'ac' => $ac,
            'pc' => $pc
        );
        return ((object)$ret);
    }

    //Get list of medicines
    public function MedicineData(){
        $id = Auth::id();
        $data = DB::table('users')
                ->where('users.id',$id)
                ->join('companies','companies.user_id','=','users.id')
                ->join('medicines','medicines.company_id','=','companies.id')
                ->get('medicines.id');
        $returner = [];
        foreach($data as $dt){
            array_push($returner,((array)$dt)['id']);
        }
        return response()->json($returner);
    }
}
<?php
/**
 * author: xlukac16
 * requests: from graph view
 * view: company and doctor graph editor 
 */
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Log;
use Exepction;
use Illuminate\Support\Facades\Auth;
use DateTime;
use App\Models\Treatment;
use App\Models\Company;
use App\Models\User;

//Settles request for main graph creation
class GraphController extends Controller
{
    //Get list of allowed users
    function get_user_list(){
        $id = Auth::id();
            $type = User::where('id',$id)->value('type');
            $treatments = [];
            if($type == 1){
                $treatments = DB::table('users')
                                        ->where([
                                            ['users.allow_data_usage','=',1]
                                        ])
                                        ->get(['users.id']);
            }
            else if($type == 2){
                $treatments = Company::join('medicines','medicines.company_id','=','companies.id')
                                        ->join('v_medicine_treatments','v_medicine_treatments.medicine_id','=','medicines.id')
                                        ->join('treatments','treatments.id','=','v_medicine_treatments.treatment_id')
                                        ->join('users','users.id','=','treatments.patient_id')
                                        ->where([
                                            ['companies.user_id','=',$id],
                                            ['users.allow_data_usage','=',1]
                                        ])
                                        ->get(['users.id']);
            }else
                $treatments = [];
        return $treatments;
    }

    //Get oldest relevant date when not given
    function get_first_date($treatments){
        $min = NULL;
        $last = DB::table('treatments')->join('users','users.id','=',"treatments.patient_id")->whereIn('users.id',$treatments)->get('treatments.start');
        $last = json_decode($last,true);
        foreach($last as $trt){
            $trt = $trt['start'];
            $last = date_create_from_format('Y-m-d',$trt);
            if($min == NULL)$min = $last;
            if($min > $last)$min = $last;
        }
        return $min;
    }

    //Return given date or first relevant
    function get_from_date($filters,$treatments){
        $date_giv = $filters['date_from'];
        if($date_giv == "") return $this->get_first_date($treatments);
        else return date_create_from_format('Y-m-d',$date_giv);
    }

    //Return given date or this(todays) date
    function get_till_date($filters){
        $date_giv = $filters['date_till'];
        if($date_giv == "") {$returner = date_create_from_format('Y-m-d',date('Y-m-d'));}
        else $returner = date_create_from_format('Y-m-d',$date_giv);
        return $returner;
    }

    //Get list of ids
    function get_id_list($treatments){
        $ids = array();
        foreach($treatments as $val_id){
            array_push($ids,$val_id['id']);
        }
        return $ids;
    }


    //Get selected value for one date for one user
    function get_selected_val_for_date($table,$date,$u_id,$value){
        if (!(is_a($date, 'DateTime'))){
            return NULL;
        }
        $date_bef = $this->get_thing_before($table,$date,$u_id);
        $date_aft = $this->get_thing_after($table,$date,$u_id);
        if($date_bef == NULL && $date_aft==NULL)
            return NULL;
        if($date_bef == NULL){
            $pom = json_decode(DB::table($table)->where($table.".id",'=',$date_aft)->value($value),true);
            //$pom = $pom[0];
            return $pom;
        }else if($date_aft == NULL){
            $pom = json_decode(DB::table($table)->where($table.".id",'=',$date_bef)->value($value),true);
            //$pom = $pom[0];
            return $pom;
        }else{
            $date_bef_pom = json_decode(DB::table($table)->where($table.".id",'=',$date_bef)->value($value),true);
            //$date_bef_pom = $date_bef_pom[0];
            $date_aft_pom = json_decode( DB::table($table)->where($table.".id",'=',$date_aft)->value($value),true);
            //$date_aft_pom = $date_aft_pom[0];
            $date_bef_date = DB::table($table)->where($table.".id",'=',$date_bef)->value('date');
            $date_aft_date = DB::table($table)->where($table.".id",'=',$date_aft)->value('date');
            $date_bef_timestamp = strtotime($date_bef_date);
            $date_aft_timestamp = strtotime($date_aft_date);
            $date_cur_timestamp = strtotime($date->format('Y-m-d'));
            $total = $date_aft_timestamp - $date_bef_timestamp;
            if($total == 0) return NULL;
            $part = $date_cur_timestamp - $date_bef_timestamp;
            $percent = $part / $total;
            
            $returner = $date_bef_pom + $percent * $date_aft_pom - $date_bef_pom;
            return $returner;
        }
    }
    //Get Value before for user
    function get_thing_before($table,$date,$u_id){
        if($table == "preports"){
            $data = DB::table('users')
            ->where('users.id','=',$u_id)
            ->join('treatments','treatments.patient_id','=','users.id')
            ->join('preports','preports.treatment_id','=','treatments.id')
            ->where('preports.date','<=',$date->format('Y-m-d'))
            ->orderBy('preports.date', 'DESC')
            ->value('preports.id');
        }else if($table == "doctor_reports"){
            $data = DB::table('users')
            ->where('users.id','=',$u_id)
            ->join('treatments','treatments.patient_id','=','users.id')
            ->join('doctor_reports','doctor_reports.treatment_id','=','treatments.id')
            ->orderBy('doctor_reports.date', 'DESC')
            ->where('doctor_reports.date','<=',$date->format('Y-m-d'))
            ->value('doctor_reports.id');
        }
        return $data;
    }
    //Get value after for user
    function get_thing_after($table,$date,$u_id){
        if($table == "preports"){
            $data = DB::table('users')
            ->where('users.id','=',$u_id)
            ->join('treatments','treatments.patient_id','=','users.id')
            ->join('preports','preports.treatment_id','=','treatments.id')
            ->where('preports.date','>=',$date->format('Y-m-d'))
            ->orderBy('preports.date', 'ASC')
            ->value('preports.id');
        }else if($table == "doctor_reports"){
            $data = DB::table('users')
            ->where('users.id','=',$u_id)
            ->join('treatments','treatments.patient_id','=','users.id')
            ->join('doctor_reports','doctor_reports.treatment_id','=','treatments.id')
            ->orderBy('doctor_reports.date', 'ASC')
            ->where('doctor_reports.date','>=',$date->format('Y-m-d'))
            ->value('doctor_reports.id');
        }
        return $data;
    }

    //Checks filters, if value should be counted
    function check_filters($id,$date,$filter_group){
        $WM = $filter_group['WM'];
        $BM = $filter_group['BM'];
        $WS = $filter_group['WS'];
        $BS = $filter_group['BS'];
        foreach($WM as $w_m){
            if($this->check_medicine_date_white($id,$w_m,$date)==0)return 0;
        }
        foreach($BM as $B_m){
            if($this->check_medicine_date_black($id,$B_m,$date)==0)return 0;
        }
        foreach($WS as $W_s){
            if($this->check_substate_date_white($id,$W_s,$date)==0)return 0;
        }
        foreach($BS as $B_s){
            if($this->check_substate_date_black($id,$B_s,$date)==0)return 0;
        }
        return 1;
    }

    //Check if substate is not active
    function check_substate_date_black($id,$substate,$date){
        $data = DB::table('v_substate_treatments')
            ->where('v_substate_treatments.from','<=',$date->format('Y-m-d'))
            ->where(function ($q) use($date) {
                $q->where('v_substate_treatments.till','>=',$date->format('Y-m-d'))->orWhere('v_substate_treatments.till','=',NULL);
            })
            ->join('substates','substates.id','=','v_substate_treatments.substate_id')
            ->where('substates.name','=',$substate)
            ->join('treatments','treatments.id','=','v_substate_treatments.treatment_id')
            ->join('users','users.id','=','treatments.patient_id')
            ->where('users.id','=',$id)
            ->value('preports.id');
        if($data!=NULL)return 0;
        return 1;
    }

    //Check if substate is active
    function check_substate_date_white($id,$substate,$date){
        $data = DB::table('v_substate_treatments')
            ->where('v_substate_treatments.from','<=',$date->format('Y-m-d'))
            ->where(function ($q) use($date) {
                $q->where('v_substate_treatments.till','>=',$date->format('Y-m-d'))->orWhere('v_substate_treatments.till','=',NULL);
            })
            ->join('substates','substates.id','=','v_substate_treatments.substate_id')
            ->where('substates.name','=',$substate)
            ->join('treatments','treatments.id','=','v_substate_treatments.treatment_id')
            ->join('users','users.id','=','treatments.patient_id')
            ->where('users.id','=',$id)
            ->value('preports.id');
        if($data==NULL)return 0;
        return 1;
    }

    //Check if medicine is not active
    function check_medicine_date_black($id,$medicine,$date){
        $data = DB::table('v_medicine_treatments')
            ->where('v_medicine_treatments.from','<=',$date->format('Y-m-d'))
            ->where(function ($q) use($date) {
                $q->where('v_medicine_treatments.till','>=',$date->format('Y-m-d'))->orWhere('v_medicine_treatments.till','=',NULL);
            })
            ->join('medicines','medicines.id','=','v_medicine_treatments.medicine_id')
            ->where('medicines.name','=',$medicine)
            ->join('treatments','treatments.id','=','v_medicine_treatments.treatment_id')
            ->join('users','users.id','=','treatments.patient_id')
            ->where('users.id','=',$id)
            ->value('medicines.id');
        if($data!=NULL)return 0;
        return 1;
    }

    //Check if medicine is active
    function check_medicine_date_white($id,$medicine,$date){
        $data = DB::table('v_medicine_treatments')
            ->where('v_medicine_treatments.from','<=',$date->format('Y-m-d'))
            ->where(function ($q) use($date) {
                $q->where('v_medicine_treatments.till','>=',$date->format('Y-m-d'))->orWhere('v_medicine_treatments.till','=',NULL);
            })
            ->join('medicines','medicines.id','=','v_medicine_treatments.medicine_id')
            ->join('treatments','treatments.id','=','v_medicine_treatments.treatment_id')
            ->join('users','users.id','=','treatments.patient_id')
            ->where('users.id','=',$id)
            ->where('medicines.name','=',$medicine)
            ->value('medicines.id');
        if($data==NULL)return 0;
        return 1;
    }

    //Get all dates for graph, between from and till dates
    public static function get_graph_dates($f_from,$f_till){
        $arr = [];
        date_default_timezone_set('Europe/Bratislava');
        $period = new \DatePeriod(
            $f_from,
            new \DateInterval('P6M'),
            $f_till
        );
       foreach($period as $key => $value) {
            array_push($arr,$value);   
        }
        return $arr;
    }

    //Generate DAS value
    function count_DAS_value($f_klb,$s_klb,$crp_val,$patinet_vas){
        return 0.56*sqrt($f_klb) +0.28*sqrt($s_klb)+0.014*$patinet_vas+0.36*log($crp_val+1)+0.96;
    }

    //Choose which value is to be shown in graph and which table it is in
    function get_collected_stuff($in_val){
        switch ($in_val){
                case "VAS pacient":
                    return ['doctor_reports','VASp'];
                case "VAS doktor":
                    return ['doctor_reports','VAS'];
                case "Rontgenove poskodenie":
                    return ['doctor_reports','Ront'];
                case "pocet bolestivych klbov":
                    return ['doctor_reports','Func'];
                case "pocet napuchnutych klbov":
                    return ['doctor_reports','Swell'];
                case "hodnota sedimentacie":
                    return ['doctor_reports','Sediment'];
                case "CRP":
                    return ['doctor_reports','CRP'];
                case "HQ":
                    return ['preports','HQ'];
                case "DAS":
                    return ['doctor_reports','DAS'];
                default:
                    break;
        }
    }

    //Get filters from input
    function get_filters($in_arr,$date_count){
        $filter_groups = [];
        foreach($in_arr as $group){
            $filter_group = array(
                "name" => $group["name"],
                "WM" => $group['filter_medicine_whitelist'],
                "BM" => $group['filter_medicine_blacklist'],
                "WS" => $group['filter_state_whitelist'],
                "BS" => $group['filter_state_blacklist'],
                "values" => array_fill(0,$date_count,0),
            );
            array_push($filter_groups,$filter_group);
        }
        return $filter_groups;
    }

    //Main generate graph
    public function get_data(Request $request){
        //Get relevant users
        $users = json_decode( $this->get_user_list(),true);
        $users = $this->get_id_list($users);
        
        //Decode filters
        $filters = json_decode($request->data,true);

        //Set dates for graph
        $f_from = $this->get_from_date($filters,$users);
        $f_till = $this->get_till_date($filters);
        $graph_dates = $this->get_graph_dates($f_from,$f_till);

        //Check which value to follow
        $value_to_get_arr= $this->get_collected_stuff($filters['selected_value']);
        $collected_val = $value_to_get_arr[1];
        $collected_table = $value_to_get_arr[0];

        //Check filter sets
        $filter_groups = $this->get_filters($filters['filter_sets'],count($graph_dates));

        //generate lists of values
        $date_index = 0;
        foreach($graph_dates as $curdate){
            $user_c = array_fill(0,count($filter_groups),0);
            foreach($users as $user_id){
                $index = -1;
            
                $val = $this->get_selected_val_for_date($collected_table,$curdate,$user_id,$collected_val);
                for($i=0;$i<count($filter_groups);$i++){
                    $index++;
                    $ok = $this->check_filters($user_id,$curdate,$filter_groups[$i]);
                    if($ok!=1) continue;
                    $user_c[$index]++;
                    $filter_groups[$i]["values"][$date_index] += $val;
                }
            }
            $u_index = 0;
            foreach($filter_groups as $fg){
                if($user_c[$u_index]==0)continue;
                $fg["values"][$date_index] /= $user_c[$u_index];
                $u_index++;
            }

            $date_index++;
        }

        //Create format that is easily read by graph.js
        $dates_string = [];
        foreach($graph_dates as $datt)
            array_push($dates_string,$datt->format('Y-m-d'));
        $returner =(array) [
            'date' => $dates_string,
            'type' => $filters['graph_type']
        ];
        for($i=0;$i < count($filter_groups);$i++)
        {
            $returner[$i] = $filter_groups[$i];
        }
        $returner = (object)$returner;
        
        return response()->json($returner);
    }
}

/*
try{
            
        }catch(Exepction $e){
            Log::error($e);
        }*/

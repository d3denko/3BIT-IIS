<?php
/**
 * author: xhoril01
 * requests: from mulitple views
 * view: multiple views
 */

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

use Illuminate\Http\Request;
use Log;
use Exception;

use App\Models\User;
use App\Models\Medicine;
use App\Models\Company;
use App\Models\Substate;
use App\Models\Treatment;
use App\Models\DoctorReport;
use App\Models\Preport;
use App\Models\VSubstateTreatment;
use App\Models\VMedicineTreatment;
use App\Models\VDoctorTreatment;

//Returns data for requests connected to user
class UserController extends Controller
{
    //Returns user type
    public function type($id){
        try{

            $type = User::where('id',$id)->value('type');

            return response()->json($type);

        }catch(Exception $e){
            Log::error($e);
        }
    }

    //Returns user type used for checking with other routes
    public function type_wt_json($id){
        try{
            $type = User::where('id',$id)->value('type');
            return $type;
        
        }catch(Exepction $e){
            return -1;
        }
    }

    //Get name of user
    public function name($id){
        try{

            $name = User::where('id',$id)->value('name');
            return response()->json($name);
        
        }catch(Exception $e){
            Log::error($e);
        }
    }

    //Get id in json format
    public function id($id){
        try{

            return response()->json($id);
        
        }catch(Exception $e){
            Log::error($e);
        }
    }
    

// ------------------------------- DOCTOR --------------------------------- \\

    //Return list of doctors
    public function getDocsInfo(){
        try {

            $doctors = User::where('type', '1')->get();
            return response()->json($doctors);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //returns details about selected doctor
    public function getDocsDetails(Request $request){
        try {

            $doctor = User::findOrFail($request->get('docID'));
            return response()->json($doctor);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //update information about doctor
    public function updateDocInfo(Request $request){
        try {
            $docID = $request->get('docID');
            $docName = $request->get('docName');
            $docLast = $request->get('docLast');
            $docMail = $request->get('docMail');

            User::where('id', $docID)->update([
                'name' => $docName,
                'last_name' => $docLast,
                'email' => $docMail,
                'updated_at' => now(),
            ]);

            return response()->json([
                'name' => $docName,
                'last_name' => $docLast,
                'email' => $docMail
            ]);


        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Delete doctor
    public function deleteDocData(User $doctor){
        try {

            $doctor->delete();

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Add new doctor
    public function addDocData(Request $request){
        try {

            $docName = $request->get('docName');
            $docLast = $request->get('docLast');
            $docMail = $request->get('docMail');
            $docPwd = $request->get('docPwd');

            DB::table('users')->insert([
                'name' => $docName,
                'last_name' =>$docLast,
                'email' => $docMail,
                'type' => 1,
                'email_verified_at' => now(),
                'remember_token' => \Str::random(10),
                'password' => \Hash::make($docPwd),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'name' => $docName,
                'last_name' => $docLast,
                'email' => $docMail
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

// ----------------------------- END DOCTOR ------------------------------- \\


// ------------------------------- COMPANY -------------------------------- \\

    //Get company list
    public function getCompsInfo(){
        try {
            $companies = Company::all();
            return response()->json($companies);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Add new company
    public function addCompData(Request $request){
        try {

            $compName = $request->get('compName');
            $compAddr = $request->get('compAddr');
            $compPhone = $request->get('compPhone');
            $compMail = $request->get('compMail');
            $compDesc = $request->get('compDesc');
            $compPwd = $request->get('compPwd');
            $username = $request->get('username');
            $userlast = $request->get('userlast');
            $usermail = $request->get('usermail');

            DB::table('users')->insert([
                'name' => $username,
                'last_name' => $userlast,
                'email' => $usermail,
                'type' => 2,
                'email_verified_at' => now(),
                'remember_token' => \Str::random(10),
                'password' => \Hash::make($compPwd),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $id = DB::table('users')
                    ->where('email', $usermail)
                    ->value('id');

            DB::table('companies')->insert([
                'name' => $compName,
                'location' => $compAddr,
                'phone' => $compPhone,
                'mail' => $compMail,
                'desc' => $compDesc,
                'user_id' => $id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'name' => $compName,
                'email' => $compMail
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //get company details
    public function getCompDetails(Request $request){
        try {

            $company = Company::findOrFail($request->get('compID'));
            return response()->json($company);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get user connected to company
    public function getCompUser(Request $request){
        try {

            $id = Company::where('id', ($request->get('compID')))->value('user_id');
            $user = User::findOrFail($id);
            return response()->json($user);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //update user connected to company
    public function updateCompUser(Request $request){
        try {

            $id = Company::where('id', ($request->get('compID')))->value('user_id');
            $userName = $request->get('userName');
            $userLast = $request->get('userLast');
            $userMail = $request->get('userMail');

            User::where('id', $id)->update([
                'name' => $userName,
                'last_name' => $userLast,
                'email' => $userMail,
                'updated_at' => now()
            ]);

            return response()->json([
                'name' => $userName,
                'last_name' => $userLast,
                'email' => $userMail
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //update company info
    public function updateCompInfo(Request $request){
        try {
            $id = $request->get('compID');
            $name = $request->get('compName');
            $addr = $request->get('compAddr');
            $phone = $request->get('compPhone');
            $mail = $request->get('compMail');
            $desc = $request->get('compDesc');

            Company::where('id', $id)->update([
                'name' => $name,
                'location' => $addr,
                'phone' => $phone,
                'mail' => $mail,
                'desc' => $desc,
                'updated_at' => now()
            ]);

            return response()->json([
                'name' => $name,
                'location' => $addr,
                'phone' => $phone,
                'mail' => $mail,
                'desc' => $desc
            ]);


        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Unbind medicines connected to company for deletion
    public function unbindCompDrugs(Request $request){
        try {
            $id = $request->get('id');

            DB::table('medicines')
              ->where('company_id', $id)
              ->update([
                'company_id' => NULL
              ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Delete company data
    public function deleteCompData(Company $company){
        try {
            $company->delete();

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Delete user connected to company
    public function deleteCompUser(User $user){
        try {
            $user->delete();

        } catch(Exception $e){
            Log::error($e);
        }
    }

// ----------------------------- END COMPANY ------------------------------ \\


// -------------------------------- DRUGS --------------------------------- \\

    //Get medicine list
    public function getDrugsInfo(){
        try {
            $drugs = Medicine::all();
            return response()->json($drugs);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //get info about medicines
    public function getDrugsDetails(Request $request){
        try {

            $drug = Medicine::findOrFail($request->get('drugID'));
            return response()->json($drug);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get name of company connected
    public function getCompName(Request $request){
        try {
            
            $id = $request->get('drugID');
            $compID = Medicine::where('id', $id)->value('company_id');
            $name = Company::where('id', $compID)->value('name');

            if($name != null) return response()->json($name);       
            else return response()->json("< Neznáma spoločnosť >");

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Update medicine info
    public function updateDrugInfo(Request $request){
        try {  

            $id = $request->get('drugID');
            $name = $request->get('drugName');
            $vers = $request->get('drugVers');
            $type = $request->get('drugType');
            $compName = $request->get('compName');

            $compID = Company::where('name', $compName)->value('id');

            Medicine::where('id', $id)->update([
                'name' => $name,
                'version' => $vers,
                'type' => $type,
                'company_id' => $compID,
                'updated_at' => now()
            ]);

            return response()->json([
                'name' => $name,
                'version' => $vers,
                'type' => $type,
                'company_id' => $compID,
            ]);


        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Add new medicine
    public function addDrugData(Request $request){
        try {

            $name = $request->get('drugName');
            $vers = $request->get('drugVers');
            $type = $request->get('drugType');
            $compID = $request->get('compID');

            DB::table('medicines')->insert([
                'name' => $name,
                'version' => $vers,
                'type' => $type,
                'company_id' => $compID,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'name' => $name
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Remove medicine
    public function deleteDrugData(Medicine $drug){
        try {
            $drug->delete();

        } catch(Exception $e){
            Log::error($e);
        }
    }

// ------------------------------ END DRUGS -------------------------------- \\


// ------------------------------- PATIENTS -------------------------------- \\

    //Get list of patients of doctor
    public function getPatsInfo($id) {
        try {
            
            $patients = DB::table('treatments')
                                ->join('v_doctor_treatments','v_doctor_treatments.treatment_id','=','treatments.id')
                                ->join('users','users.id','=','treatments.patient_id')
                                ->where([
                                            ['v_doctor_treatments.doctor_id','=',$id],
                                            ['v_doctor_treatments.till','=',NULL]
                                        ])
                                ->get('*');
            return response()->json($patients);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get data of patients
    public function getPatsData(Request $request){
        try {

            $patient_id = $request->get('patient_id');
            $data = DB::table('treatments')
                      ->join('users', 'users.id','=','treatments.patient_id')
                      ->join('v_doctor_treatments', 'treatment_id','=','treatments.id')
                      ->where('treatments.patient_id','=',$patient_id)
                      ->get(['name', 'last_name', 'email', 'gender', 'age', 'next_visit', 'doctor_id']);


            return response()->json($data);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Add new patient
    public function addPatient(Request $request){
        try {

            $name = $request->get('patName');
            $last = $request->get('patLast');
            $mail = $request->get('patMail');
            $pwd = $request->get('patPwd');
            $age = $request->get('patAge');
            $gender = $request->get('patGender');
            $diagnosis = $request->get('date');
            $doctor_id = $request->get('doctor_id');

            DB::table('users')->insert([
                'name' => $name,
                'last_name' =>$last,
                'email' => $mail,
                'type' => 0,
                'email_verified_at' => now(),
                'remember_token' => \Str::random(10),
                'password' => \Hash::make($pwd),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $patient_id = User::where('email', $mail)->value('id');

            DB::table('treatments')->insert([
                'created_at' => now(),
                'updated_at' => now(),
                'next_visit' => NULL,
                'age' => $age,
                'gender' => $gender,
                'diagnosis' => $diagnosis,
                'start' => date("Y-m-d"),
                'patient_id' => $patient_id
            ]);

            $treatment_id = Treatment::where('patient_id',$patient_id)->value('id');

            DB::table('v_doctor_treatments')->insert([
                'created_at' => now(),
                'updated_at' => now(),
                'from' => date("Y-m-d"),
                'till' => NULL,
                'doctor_id' => $doctor_id,
                'treatment_id' => $treatment_id
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    ///Get doctor reports connected to patient
    public function getDocsReports(Request $request){ 
        try {

            $patient_id = $request->get('patient_id');
            $reports = DB::table('doctor_reports')
                                ->join('treatments', 'doctor_reports.treatment_id','=','treatments.id')
                                ->where('patient_id','=',$patient_id)
                                ->get(['doctor_reports.id','date']);
            return response()->json($reports);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get patients reports connected to patient
    public function getPatsReports(Request $request){ 
        try {

            $patient_id = $request->get('patient_id');
            $reports = DB::table('preports')
                                ->join('treatments', 'preports.treatment_id','=','treatments.id')
                                ->where('patient_id','=',$patient_id)
                                ->get(['preports.id','date']);
            return response()->json($reports);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get data in doctor report
    public function getDocReportsData(Request $request){ 
        try {

            $report_id = $request->get('patient_id');
            $data = DoctorReport::where('id',$report_id)
                    ->get(['Ront','Func','Pain','Swell','Sediment','CRP','VAS','VASp','DAS']);
            return response()->json($data);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get data in patient report
    public function getPatReportsData(Request $request){ 
        try {

            $report_id = $request->get('patient_id');
            $data = Preport::where('id',$report_id)
                    ->get('*');
            return response()->json($data);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get active states connected to patient
    public function getPatActiveStates(Request $request){ 
        try {

            $patient_id = $request->get('patient_id');

            $states = DB::table('treatments')
                        ->join('v_substate_treatments', 'treatments.id','=','treatment_id')
                        ->join('substates', 'substate_id','=','substates.id')
                        ->where([
                                    ['patient_id',$patient_id],
                                    ['till',NULL] 
                                ])
                        ->get(['from','till','name', 'substate_id']);
            
            return response()->json($states);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get inactive states connected to patient
    public function getPatInactiveStates(Request $request){ 
        try {

            $patient_id = $request->get('patient_id');

            $states = DB::table('treatments')
                        ->join('v_substate_treatments', 'treatments.id','=','treatment_id')
                        ->join('substates', 'substate_id','=','substates.id')
                        ->where([
                                    ['patient_id',$patient_id ],
                                    ['till','!=',NULL]
                                ])
                        ->get(['from','till','name', 'substate_id']);
            
            return response()->json($states);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get active medicines connected to patient
    public function getPatActiveDrugs(Request $request){ 
        try {

            $patient_id = $request->get('patient_id');

            $drugs = DB::table('v_medicine_treatments')
                       ->join('medicines', 'medicines.id','=','medicine_id')
                       ->join('treatments', 'treatments.id','=','treatment_id')
                       ->where([
                                    ['patient_id', $patient_id ],
                                    ['till', NULL]
                                ])
                       ->orderby('main', 'DESC')
                       ->get(['name','from','till','main','dosage_time','dosage_period', 'medicine_id']);

            return response()->json($drugs);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get inactive medicines connected to patient
    public function getPatInactiveDrugs(Request $request){ 
        try {

            $patient_id = $request->get('patient_id');

            $drugs = DB::table('v_medicine_treatments')
                       ->join('medicines', 'medicines.id','=','medicine_id')
                       ->join('treatments', 'treatments.id','=','treatment_id')
                       ->where([
                                    ['patient_id', $patient_id ],
                                    ['till', '!=', NULL]
                                ])
                       ->orderby('main','DESC')
                       ->get(['name','from','till','main','dosage_time','dosage_period', 'medicine_id']);

            return response()->json($drugs);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //make active states inactive
    public function closeState(Request $request){ 
        try {

            $substate_id = $request->get('stateID');

            VSubstateTreatment::where('substate_id',$substate_id)->update([
                'updated_at' => now(),
                'till' => date("Y-m-d")
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //make active medicine inactive
    public function closeDrug(Request $request){ 
        try {

            $medicine_id = $request->get('drugID');
            $removal = $request->get('reason');

            if($removal == NULL) $removal = "";
            VMedicineTreatment::where('medicine_id',$medicine_id)->update([
                'updated_at' => now(),
                'till' => date("Y-m-d"),
                'removal' => $removal
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get list of states
    public function getStateNames(){
        try {
            $state = Substate::all();
            return response()->json($state);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Add new state to patient
    public function addPatState(Request $request){
        try {

            $patient_id = $request->get('patient_id');
            $state = $request->get('state');
            
            $treatment_id = Treatment::where('patient_id', $patient_id)->value('id');
            $state_id = Substate::where('name', $state)->value('id');

            DB::table('v_substate_treatments')->insert([
                'created_at' => now(),
                'updated_at' => now(),
                'from' => date("Y-m-d"),
                'till' => NULL,
                'substate_id' => $state_id,
                'treatment_id' => $treatment_id,
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Add new medicine to patient
    public function addPatDrug(Request $request){
        try {

            $patient_id = $request->get('patient_id');
            $drug_id = $request->get('drug');
            $period = $request->get('period');
            $time = $request->get('time');
            $main = $request->get('main');

            
            $treatment_id = Treatment::where('patient_id', $patient_id)->value('id');

            DB::table('v_medicine_treatments')->insert([
                'created_at' => now(),
                'updated_at' => now(),
                'from' => date("Y-m-d"),
                'till' => NULL,
                'main' => $main,
                'dosage_time' => $time,
                'dosage_period' => $period,
                'medicine_id' => $drug_id,
                'treatment_id' => $treatment_id,
                'removal' => ""
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Get list of medicines
    public function getDrugNames(){
        try {
            $drugs = Medicine::all();
            return response()->json($drugs);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //add new doctor report
    public function newDocReport(Request $request){
        try {

            $ront = $request->get('ront');
            $func = $request->get('func');
            $pain = $request->get('pain');
            $swell = $request->get('swell');
            $sedi = $request->get('sedi');
            $crp = $request->get('crp');
            $vas = $request->get('vas');
            $vasP = $request->get('vasP');
            $das = $request->get('das');
            
            $patient_id = $request->get('patient_id');
            $treatment_id = Treatment::where('patient_id', $patient_id)->value('id');

            DB::table('doctor_reports')->insert([
                'created_at' => now(),
                'updated_at' => now(),
                'date' => date("Y-m-d"),
                'Ront' => $ront,
                'Func' => $func,
                'Pain' => $pain,
                'Swell' => $swell,
                'Sediment' => $sedi,
                'CRP' => $crp,
                'VAS' => $vas,
                'VASp' => $vasP,
                'DAS' => $das,
                'treatment_id' => $treatment_id
            ]);

            return response()->json([
                'treatment_id' => $treatment_id,
                'date' => date("Y-m-d")
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //change next visit date
    public function changeVisitDate(Request $request){
        try {
            
            $date = $request->get('date');
            $patient_id = $request->get('patient_id');

            Treatment::where('patient_id', $patient_id)->update([
                'updated_at' => now(),
                'next_visit' => $date
            ]);

            return response()->json([
                'next_visit' => $date
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //close the treatment on given patient
    public function endPatient(Request $request){
        try {
            
            $patient_id = $request->get('id');

            $treatment_id = Treatment::where('patient_id', $patient_id)->value('id');

            VDoctorTreatment::where('treatment_id', $treatment_id)->update([
                'updated_at' => now(),
                'till' => now()
            ]);

        } catch(Exception $e){
            Log::error($e);
        } 
    }

    //Add new patient report
    public function newPatReport(Request $request){
        try {

            $report = $request->get('state');

            $q1 = $request->get('q1');  $q8 = $request->get('q8');  $q15 = $request->get('q15');
            $q2 = $request->get('q2');  $q9 = $request->get('q9');  $q16 = $request->get('q16');
            $q3 = $request->get('q3');  $q10 = $request->get('q10');  $q17 = $request->get('q17');
            $q4 = $request->get('q4');  $q11 = $request->get('q11');  $q18 = $request->get('q18');
            $q5 = $request->get('q5');  $q12 = $request->get('q12');  $q19 = $request->get('q19');
            $q6 = $request->get('q6');  $q13 = $request->get('q13');  $q20 = $request->get('q20');
            $q7 = $request->get('q7');  $q14 = $request->get('q14');  

            $b11 = $request->get('b11');  $b18 = $request->get('b18');
            $b12 = $request->get('b12');  $b19 = $request->get('b19');
            $b13 = $request->get('b13');  $b110 = $request->get('b110');
            $b14 = $request->get('b14');  $b111 = $request->get('b111');
            $b15 = $request->get('b15');  $b112 = $request->get('b112');
            $b16 = $request->get('b16');  $b113 = $request->get('b113');
            $b17 = $request->get('b17');  

            $b21 = $request->get('b21');  $b25 = $request->get('b25');
            $b22 = $request->get('b22');  $b26 = $request->get('b26');
            $b23 = $request->get('b23');  $b27 = $request->get('b27');
            $b24 = $request->get('b24');  $b28 = $request->get('b28');

            $other = $request->get('other');
            $hqP = $request->get('hqP');

            if($other == NULL) $other = "";

            $patient_id = $request->get('patient_id');

            $treatment_id = Treatment::where('patient_id', $patient_id)->value('id');

            DB::table('preports')->insert([
                'created_at' => now(),
                'updated_at' => now(),
                'date' => date("Y-m-d"),

                'Q1' => $q1, 'Q11' => $q11,
                'Q2' => $q2, 'Q12' => $q12,
                'Q3' => $q3, 'Q13' => $q13,
                'Q4' => $q4, 'Q14' => $q14,
                'Q5' => $q5, 'Q15' => $q15,
                'Q6' => $q6, 'Q16' => $q16,
                'Q7' => $q7, 'Q17' => $q17,
                'Q8' => $q8, 'Q18' => $q18,
                'Q9' => $q9, 'Q19' => $q19,
                'Q10' => $q10, 'Q20' => $q20,

                'B11' => $b11, 'B18' => $b18,
                'B12' => $b12, 'B19' => $b19,
                'B13' => $b13, 'B110' => $b110,
                'B14' => $b14, 'B111' => $b111,
                'B15' => $b15, 'B112' => $b112,
                'B16' => $b16, 'B113' => $b113,
                'B17' => $b17,

                'B21' => $b21, 'B25' => $b25,
                'B22' => $b22, 'B26' => $b26,
                'B23' => $b23, 'B27' => $b27,
                'B24' => $b24, 'B28' => $b28,

                'Other' => $other,
                'HQp' => "70.25",

                'treatment_id' => $treatment_id
            ]);

        } catch(Exception $e){
            Log::error($e);
        }
    }

// ----------------------------- END PATIENTS ------------------------------ \\

    //Check if user exists
    public function user_exists($user_mail){
        try {

            $count = DB::table('users')->where('users.email','=',$user_mail)->count();
            if($count > 0)return "true";
            else return "false";

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Check if company exists
    public function company_exists($company_name){
        try {

            $count = DB::table('companies')->where('companies.name','=',$company_name)->count();
            if($count > 0)return "true";
            else return "false";

        } catch(Exception $e){
            Log::error($e);
        }
    }

    //Check if medicine exists
    public function drug_exists($drug_name){
        try {

            $count = DB::table('medicines')->where('medicines.name','=',$drug_name)->count();
            if($count > 0)return "true";
            else return "false";

        } catch(Exception $e){
            Log::error($e);
        }
    }


}


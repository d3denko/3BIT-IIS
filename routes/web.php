<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GraphController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FiltersController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('home');
});

Auth::routes();

// Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/home', function(){
    $id = Auth::id();
    if($id==NULL)return view('home');
    return App::call('App\Http\Controllers\HomeController@index' , ['id' => $id]);
});

Route::get('get/user/type', function(){
    $id = Auth::id();
    return App::call('App\Http\Controllers\UserController@type' , ['id' => $id]);
});

Route::get('/home/get/user/type', function(){
    $id = Auth::id();
    return App::call('App\Http\Controllers\UserController@type' , ['id' => $id]);
});

Route::get('get/user/name', function(){
    $id = Auth::id();
    return App::call('App\Http\Controllers\UserController@name', ['id' => $id]);
});

Route::get('get/treatments/filter',[GraphController::class,'get_data']);

Route::get('/home/user_exists/{user_mail}',function($user_mail){
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 3)return "true";
    else return App::call('App\Http\Controllers\UserController@user_exists' , ['user_mail' => $user_mail]);
});

Route::get('/home/company_exists/{company_name}',function($company_name){
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 3)return "true";
    else return App::call('App\Http\Controllers\UserController@company_exists' , ['company_name' => $company_name]);
});

Route::get('/home/drug_exists/{drug_name}',function($drug_name){
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 3)return "true";
    else return App::call('App\Http\Controllers\UserController@drug_exists' , ['drug_name' => $drug_name]);
});


Route::get('/home/get/treatments/filter',[App\Http\Controllers\GraphController::class,'get_data']);

Route::get('/home/get/filters/state_data',[App\Http\Controllers\FiltersController::class,'get_states']);

Route::get('/home/get/filters/medicine_data',[App\Http\Controllers\FiltersController::class,'get_medicines']);


// ------------------------------------ DOCTOR -------------------------------------- \\

Route::get('/home/get/doctors/info',[UserController::class,'getDocsInfo']);

Route::post('/home/get/doc/details',[UserController::class,'getDocsDetails']);

Route::post('/home/update/doc/info',[UserController::class,'updateDocInfo']);

Route::delete('/home/delete/doctor/{doctor}', [UserController::class,'deleteDocData']);

Route::post('/home/add/doctor', [UserController::class,'addDocData']);

// ---------------------------------- END DOCTOR ------------------------------------ \\


// ------------------------------------ COMPANY ------------------------------------- \\

Route::get('/home/get/companies/info',[UserController::class,'getCompsInfo']);

Route::post('/home/add/company', [UserController::class,'addCompData']);

Route::post('/home/get/comp/details', [UserController::class,'getCompDetails']);

Route::post('/home/get/comp/user', [UserController::class,'getCompUser']);

Route::post('/home/update/comp/user',[UserController::class,'updateCompUser']);

Route::post('/home/update/comp/info',[UserController::class,'updateCompInfo']);

Route::post('/home/unbind/company/drugs', [UserController::class,'unbindCompDrugs']);

Route::delete('/home/delete/company/{company}', [UserController::class,'deleteCompData']);

Route::delete('/home/delete/user/{user}', [UserController::class,'deleteCompUser']);

// ---------------------------------- END COMPANY ----------------------------------- \\


// ------------------------------------- DRUGS -------------------------------------- \\

Route::get('/home/get/drugs/info',[UserController::class,'getDrugsInfo']);

Route::post('/home/get/drug/details',[UserController::class,'getDrugsDetails']);

Route::post('/home/get/comp/name',[UserController::class,'getCompName']);

Route::post('/home/update/drug/info',[UserController::class,'updateDrugInfo']);

Route::post('/home/add/drug', [UserController::class,'addDrugData']);

Route::delete('/home/delete/drug/{drug}', [UserController::class,'deleteDrugData']);

// ----------------------------------- END DRUGS ------------------------------------ \\


// ----------------------------------- PATIENTS ------------------------------------- \\

Route::get('/home/get/patients/info', function(){
    $id = Auth::id();
    return App::call('App\Http\Controllers\UserController@getPatsInfo', ['id' => $id]);
});

Route::get('/home/get/user/id', function(){
    $id = Auth::id();
    return $id;
});

Route::post('/home/add/patient', [UserController::class,'addPatient']);

Route::post('/home/get/patients/data', [UserController::class,'getPatsData']);

Route::post('/home/get/active/drugs', [UserController::class,'getPatActiveDrugs']);

Route::post('/home/get/inactive/drugs', [UserController::class,'getPatInactiveDrugs']);



Route::post('/home/prehlad_pacientov/info/get/pats/data', [UserController::class,'getPatsData']);

Route::post('/home/prehlad_pacientov/info/get/docs/reports', [UserController::class,'getDocsReports']);

Route::post('/home/prehlad_pacientov/info/get/pats/reports', [UserController::class,'getPatsReports']);

Route::post('/home/prehlad_pacientov/info/get/doc/reports/data', [UserController::class,'getDocReportsData']);

Route::post('/home/prehlad_pacientov/info/get/pat/reports/data', [UserController::class,'getPatReportsData']);

Route::post('/home/prehlad_pacientov/info/get/pats/active/states', [UserController::class,'getPatActiveStates']);

Route::post('/home/prehlad_pacientov/info/get/pats/inactive/states', [UserController::class,'getPatInactiveStates']);

Route::post('/home/prehlad_pacientov/info/get/pats/active/drugs', [UserController::class,'getPatActiveDrugs']);

Route::post('/home/prehlad_pacientov/info/get/pats/inactive/drugs', [UserController::class,'getPatInactiveDrugs']);

Route::post('/home/prehlad_pacientov/info/close/state', [UserController::class,'closeState']);

Route::post('/home/prehlad_pacientov/info/close/drug', [UserController::class,'closeDrug']);

Route::get('/home/prehlad_pacientov/info/get/states',[UserController::class,'getStateNames']);

Route::post('/home/prehlad_pacientov/info/add/state', [UserController::class,'addPatState']);

Route::get('/home/prehlad_pacientov/info/get/drugs',[UserController::class,'getDrugNames']);

Route::post('/home/prehlad_pacientov/info/add/drug', [UserController::class,'addPatDrug']);

Route::post('/home/prehlad_pacientov/info/new/doc/report', [UserController::class,'newDocReport']);

Route::post('/home/prehlad_pacientov/info/change/visit/date', [UserController::class,'changeVisitDate']);

Route::post('/home/prehlad_pacientov/info/end/patient', [UserController::class,'endPatient']);

Route::post('/home/moja_liecba/new/pat/report', [UserController::class,'newPatReport']);


// --------------------------------- END PATIENTS ----------------------------------- \\


// ------------------------------------- VIEWS -------------------------------------- \\
Route::get('/home/moja_liecba', function () {
    $id = Auth::id();
    if($id == NULL) return view('error');
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 0)return view('error');
    else return view('my_treatment');
});

Route::get('/home/o_chorobe', function () {
    $id = Auth::id();
    if($id == NULL) return view('error');
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 0)return view('error');
    else return view('about');
});

Route::get('/home/prehlad_pacientov', function () {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 1)return view('error');
    else return view('patients');
});

Route::get('/home/tvorba_grafov', function () {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 1)return view('error');
    else return view('graph_screen');
});

Route::get('/home/vytvorit_graf', function () {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 2)return view('error');
    else return view('graph_screen');
});

Route::get('/home/prehlad_firma', function () {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 2)return view('error');
    else return view('company_info');
});

Route::get('/home/prehlad_doktorov', function () {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 3)return view('error');
    else return view('doctors');
});

Route::get('/home/prehlad_firiem', function () {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 3)return view('error');
    else return view('companies');
});

Route::get('/home/prehlad_liekov', function () {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 3)return view('error');
    else return view('drugs');
});


Route::get('/home/prehlad_pacientov/info/{patient_id}', function ($patient_id) {
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 1)return view('error');
    else return view('patient_info', ['id'=>$patient_id]);
});

// ----------------------------------- END VIEWS ------------------------------------ \\

// --------------------------------- COMPANIES ----------------------------------- \\

Route::get('/home/get/company_meds/info',function(){
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 2)return"";
    else return App::call('App\Http\Controllers\CompanyController@MedicineData');
});

Route::get('/home/get/company_meds/info/{medicine_id}',function($medicine_id){
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 2)return"";
    else return App::call('App\Http\Controllers\CompanyController@GetSingleMedicineData',['med_id'=>$medicine_id]);
});

Route::get('/home/get/company_meds/graph/{medicine_id}',function($medicine_id){
    $id = Auth::id();
    $typer = App::call('App\Http\Controllers\UserController@type_wt_json' , ['id' => $id]);
    if($typer != 2)return"";
    else return App::call('App\Http\Controllers\CompanyController@GetSingleMedicineGraph',['med_id'=>$medicine_id]);
});


// --------------------------------- END COMPANIES ----------------------------------- \\

//Fallback -> else pre cesty
Route::fallback(function(){
    return view('error');
});

<?php

//namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //pacienti
        DB::table('users')->insert([
            'id' => 1,
            'name' => "David",
            'last_name' => "Dover",
            'email' => "patient1@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 2,
            'name' => "Jane",
            'last_name' => "Doe",
            'email' => "patient2@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 3,
            'name' => "Bill",
            'last_name' => "Boeard",
            'email' => "patient3@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 4,
            'name' => "Jackie",
            'last_name' => "Chan",
            'email' => "patient4@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 5,
            'name' => "Mike",
            'last_name' => "Hawk",
            'email' => "patient5@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 6,
            'name' => "Moe",
            'last_name' => "Szyslak",
            'email' => "patient6@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 7,
            'name' => "Homer",
            'last_name' => "Simpson",
            'email' => "patient7@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 8,
            'name' => "Lisa",
            'last_name' => "Simpson",
            'email' => "patient8@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);DB::table('users')->insert([
            'id' => 9,
            'name' => "Geralt",
            'last_name' => "z Rivie",
            'email' => "patient9@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),

        ]);
        //Pacient
        DB::table('users')->insert([
            'id' => 10,
            'name' => "Denis",
            'last_name' => "Horil",
            'email' => "patient@whatever.com",
            'type' => 0,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("patient"),
        ]);
        
        for($i = 0;$i<10;$i++){
            $genders = array("Male","Female");

            $year = ["1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
            $month = ["01","02","03","04","05","06","07","08","09","10","11","12"];
            $day = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28"];

            $ch_day = $day[array_rand($day,1)];
            $ch_month = $month[array_rand($month,1)];
            $ch_year = $year[array_rand($year,1)];

            $date_str = $ch_year."/".$ch_month."/".$ch_day;
            $date = strtotime($date_str);
            $date = date('Y-m-d',$date);
            DB::table('treatments')->insert([
                'id' => $i+1,
                'age' => rand(1,120),
                'gender' => $genders[array_rand($genders,1)],
                'diagnosis' => $date,
                'next_visit' => now(),
                'start' => date('Y-m-d',strtotime($date. ' + '.rand(0,5).' days')),
                'patient_id' => 1
            ]);
        }
        $this->SubStatesInit();
        $this->TestUsers();
        $companies = ["Arasaka","JokerInc","WayneInc","Gotei13","WonkaInc"];
        for($i = 0; $i < 5;$i++){
            $name = $companies[$i];
            DB::table('companies')->insert([
                'id' => $i+1,
                'name' => $name,
                'user_id' => 1,
                'location' => "This is address",
                'phone' => "Phone here",
                'mail' => "Something at something",
                'desc' =>  "And here is description",
            ]);
        }
        for($i = 1;$i < 6;$i++){
            $name = $companies[$i-1];
            for($j = 0;$j < 5;$j++){
            $cc = ["Ibuprofen","Lexaurin","Charcoal","Arsen","David's green imunoblockers","Gumidzus","LiquidLuck","Polyjuice","Viagra","WagensDoppelFuhr"];
            DB::table('medicines')->insert([
                    'id' => (($i-1)*5 + $j+1), 
                    'name' => $name."-".$cc[array_rand($cc,1)],
                    'version' => rand(0,222),
                    'type' => rand(0,4),
                    'company_id' => $i,
            ]);
        }
        }

        
        $this->UpdateUsers();
        $this->LinkDoctors();
        $this->LinkMedicines();
        $this->LinkSubstates();


        $this->Preports_Init();

        $this->Dreports_Init();

    }

    private function Preports_Init(){
        for($i = 1; $i<11;$i++){
            for($j = 0; $j <5; $j++){
                $other = rand(0,1);
                $helpers = array("Motorova pila","Handra na palicke","Pavucik menom Dory","Zavislost na cokolade");
                if($other) $oot = $helpers[array_rand($helpers,1)];
                    else $oot = "";
                DB::table('preports')->insert([
                    'id' => (($i-1)*5 + $j + 1),
                    'Q1' => rand(0,3),
                    'Q2' => rand(0,3),
                    'Q3' => rand(0,3),
                    'Q4' => rand(0,3),
                    'Q5' => rand(0,3),
                    'Q6' => rand(0,3),
                    'Q7' => rand(0,3),
                    'Q8' => rand(0,3),
                    'Q9' => rand(0,3),
                    'Q10' => rand(0,3),
                    'Q11' => rand(0,3),
                    'Q12' => rand(0,3),
                    'Q13' => rand(0,3),
                    'Q14' => rand(0,3),
                    'Q15' => rand(0,3),
                    'Q16' => rand(0,3),
                    'Q17' => rand(0,3),
                    'Q18' => rand(0,3),
                    'Q19' => rand(0,3),
                    'Q20' => rand(0,3),
                    'B11' => rand(0,1),
                    'B12' => rand(0,1),
                    'B13' => rand(0,1),
                    'B14' => rand(0,1),
                    'B15' => rand(0,1),
                    'B16' => rand(0,1),
                    'B17' => rand(0,1),
                    'B18' => rand(0,1),
                    'B19' => rand(0,1),
                    'B110' => rand(0,1),
                    'B111' => rand(0,1),
                    'B112' => rand(0,1),
                    'B113' => $other,
                    'B21' => rand(0,1),
                    'B22' => rand(0,1),
                    'B23' => rand(0,1),
                    'B24' => rand(0,1),
                    'B25' => rand(0,1),
                    'B26' => rand(0,1),
                    'B27' => rand(0,1),
                    'B28' => rand(0,1),
                    'HQp' => rand(0,100)/10,
                    'Other' => $oot,
                    'treatment_id' => 1
                ]);
            }
            for($ii = 1; $ii<6;$ii++){
                DB::table('preports')
                ->where('id',($i-1)*5+$ii)
                ->update(['treatment_id' => $i]);       
            }
            $from = date_create_from_format('Y-m-d',DB::table('treatments')->where('id',$i)->value('start'));
            $till = now();
            $date_mid = $this->GetMidDate($from,$till);
            $date_mid1 = $this->GetMidDate($from,$date_mid);
            $date_mid2 = $this->GetMidDate($date_mid,$till);
            $dm1 = $this->GetMidDate($from,$date_mid1);
            $dm2 = $this->GetMidDate($date_mid1,$date_mid);
            $dm3 = $this->GetMidDate($date_mid,$date_mid2);
            $dm4 = $this->GetMidDate($date_mid2,$till);
            $dm_arr = [$dm1,$dm2,$date_mid,$dm3,$dm4];
            for($ii = 1; $ii<6;$ii++){
                DB::table('preports')
                ->where('id',($i-1)*5+$ii)
                ->update(['date' => $dm_arr[$ii-1]]);       
            }
        }
    }

    private function Dreports_Init(){
        for($i = 1; $i<11;$i++){
            for($j = 0; $j <5; $j++){
                DB::table('doctor_reports')->insert([
                    'id' => (($i-1)*5 + $j +1),
                    'Ront' => rand(0,4),
                    'Func' => rand(0,4),
                    'Pain' => rand(0,28),
                    'Swell' => rand(0,28),
                    'Sediment' => rand(0,100),
                    'VAS' => rand(0,100),
                    'VASp' => rand(0,100),
                    'CRP' => rand(1,1000)/10,
                    'DAS' => rand(1,1000)/10,
                    'treatment_id' => 1
                ]);
            }
            for($ii = 1; $ii<6;$ii++){
                DB::table('doctor_reports')
                ->where('id',($i-1)*5+$ii)
                ->update(['treatment_id' => $i]);       
            }
            $from = date_create_from_format('Y-m-d',DB::table('treatments')->where('id',$i)->value('start'));
            $till = now();
            $date_mid = $this->GetMidDate($from,$till);
            $date_mid1 = $this->GetMidDate($from,$date_mid);
            $date_mid2 = $this->GetMidDate($date_mid,$till);
            $dm1 = $this->GetMidDate($from,$date_mid1);
            $dm2 = $this->GetMidDate($date_mid1,$date_mid);
            $dm3 = $this->GetMidDate($date_mid,$date_mid2);
            $dm4 = $this->GetMidDate($date_mid2,$till);
            $dm_arr = [$dm1,$dm2,$date_mid,$dm3,$dm4];
            for($ii = 1; $ii<6;$ii++){
                DB::table('doctor_reports')
                ->where('id',($i-1)*5+$ii)
                ->update(['date' => $dm_arr[$ii-1]]);       
            }
        }
    }

    private function LinkSubstates(){
        $cur=0;
        $off = 1;
        for($i=1;$i<11;$i++){
            $cnt = rand(0,2);
            for($j = 0; $j < $cnt;$j++){
                DB::table('v_substate_treatments')->insert([
                    'id' => $off, 
                    'treatment_id' => 1,
                'substate_id' => 1,
                'from' => now(),
                'till' => NULL
                ]);
                $off++;
            }
            for($ii=0;$ii<$cnt;$ii++){
                $sub_id = rand(1,8);
                //0 xx__ 1 _xx_ 2 __xx 3 xxxx
                $type = rand(0,3);
                $from = date_create_from_format('Y-m-d',DB::table('treatments')->where('id',$i)->value('start'));
                $till = now();
                if($type == 0){
                    $till = $this->GetMidDate($from,$till);
                }
                else if($type == 1){
                    $mid = $this->GetMidDate($from,$till);
                    $from = $this->GetMidDate($from,$mid);
                    $till = $this->GetMidDate($mid,$till);
                }
                else if($type ==2){
                    $from = $this->GetMidDate($from,$till);
                    $till = NULL;
                }
                else if($type == 4){
                    $till = NULL;
                }
                DB::table('v_substate_treatments')
                ->where('id',$cur+$ii)
                ->update(['substate_id' => $sub_id,'treatment_id' => $i ,'till'=>$till,'from'=> $from]);
            }
            $cur+=$cnt;
        }
    }

    private function GetMidDate($date1,$date2){
        $interval = $date1->diff($date2);
        $interval->y = $interval->y/2;
        $interval->m = $interval->m/2;
        $interval->d = $interval->d/2;
        $date_temp = date_create_from_format('Y-m-d',$date1->format('Y-m-d'));
        $mid = $date_temp->add($interval);
        return $mid;
    }

    private function SubStatesInit(){
        DB::table('substates')->insert([
            'id' => 1,
            'name' => "fajciar",
            'desc' => "",
            'type' => "",
        ]);
        DB::table('substates')->insert([
            'id' => 2,
            'name' => "nefajciar",
            'desc' => "",
            'type' => "",
        ]);
        DB::table('substates')->insert([
            'id' => 3,
            'name' => "tehotenstvo",
            'desc' => "",
            'type' => "",
        ]);
        DB::table('substates')->insert([
            'id' => 4,
            'name' => "liecenie na heroin",
            'desc' => "",
            'type' => "",
        ]);
        DB::table('substates')->insert([
            'id' => 5,
            'name' => "obezita",
            'desc' => "",
            'type' => "",
        ]);
        DB::table('substates')->insert([
            'id' => 6,
            'name' => "Po infarkte",
            'desc' => "",
            'type' => "Cardiovascular",
        ]);
        DB::table('substates')->insert([
            'id' => 7,
            'name' => "Hypertenzia",
            'desc' => "",
            'type' => "Cardiovascular",
        ]);
        DB::table('substates')->insert([
            'id' => 8,
            'name' => "Oblickove kamene",
            'desc' => "",
            'type' => "Vylucovacia",
        ]);
    }

    private function UpdateUsers(){
        DB::table('companies')
            ->where('id',1)
            ->update(['user_id' => 13]);
        DB::table('companies')
            ->where('id',2)
            ->update(['user_id' => 14]);
        DB::table('companies')
            ->where('id',3)
            ->update(['user_id' => 15]);
        DB::table('companies')
            ->where('id',4)
            ->update(['user_id' => 16]);
        DB::table('companies')
            ->where('id',5)
            ->update(['user_id' => 17]);
        for($i=1;$i<11;$i++)
            DB::table('treatments')->where('id',$i)->update(['patient_id' => $i]);
    }

    private function LinkMedicines(){
        $del=0;
        for($i=1;$i<11;$i++){
            $t = rand(0,9);
            $s = 2;
            if($t>1) $s =1;
            if($s==1){
                DB::table('v_medicine_treatments')->insert([
                    'id' => ($i+$del),
                    'treatment_id' => 1,
                    'medicine_id' => 1,
                    'main' => 0,
                    'from' => now(),
                    'till' => NULL,
                    'removal' => "",
                    'dosage_time' => rand(1,3),
                    'dosage_period' => rand(1,5),
                ]);
                $t = rand(1,25);
                DB::table('v_medicine_treatments')
                ->where('id',$i+$del)
                ->update(['medicine_id' => $t,'treatment_id' => $i ,'main'=>1,'till'=>NULL,'from'=> DB::table('treatments')->where('id',$i)->value('start')]);
            }else{
                DB::table('v_medicine_treatments')->insert([
                    'id' => ($i+$del),
                    'treatment_id' => 1,
                    'medicine_id' => 1,
                    'main' => 0,
                    'from' => now(),
                    'till' => NULL,
                    'removal' => "",
                    'dosage_time' => rand(1,3),
                    'dosage_period' => rand(1,5),
                ]);
                DB::table('v_medicine_treatments')->insert([
                    'id' => ($i+$del+1),
                    'treatment_id' => 1,
                    'medicine_id' => 1,
                    'main' => 0,
                    'from' => now(),
                    'till' => NULL,
                    'removal' => "",
                    'dosage_time' => rand(1,3),
                    'dosage_period' => rand(1,5),
                ]);
                $t = rand(1,25);
                $t2=$t+1;
                $t2 = ($t2==26)?1:$t2;
                $from = date_create_from_format('Y-m-d',DB::table('treatments')->where('id',$i)->value('start'));
                $till = now();
                $mid = $this->GetMidDate($from,$till);
                DB::table('v_medicine_treatments')
                ->where('id',$i+$del)
                ->update(['medicine_id' => $t,'treatment_id' => $i ,'main'=>1,'till'=>$mid,'from'=> DB::table('treatments')->where('id',$i)->value('start')]);
                DB::table('v_medicine_treatments')
                ->where('id',$i+1+$del)
                ->update(['medicine_id' => $t2,'treatment_id' => $i ,'main'=>1,'till'=>NULL,'from'=> $mid]);
                $del++;
            }
        }
    }

    private function LinkDoctors(){
        $del=0;
        for($i=1;$i<11;$i++){
            $t = rand(0,9);
            $s = 2;
            if($t>1) $s =1;
            if($s==1){
                DB::table('v_doctor_treatments')->insert([
                    'id' => ($i+$del),
                    'treatment_id' => 1,
                    'doctor_id' => 1,
                    'from' => now(),
                    'till' => NULL
                ]);
                $t = rand(11,12);
                DB::table('v_doctor_treatments')
                ->where('id',$i+$del)
                ->update(['doctor_id' => $t,'treatment_id' => $i ,'till'=>NULL,'from'=> DB::table('treatments')->where('id',$i)->value('start')]);
            }else{
                DB::table('v_doctor_treatments')->insert([
                    'id' => ($i+$del),
                    'treatment_id' => 1,
                    'doctor_id' => 1,
                    'from' => now(),
                    'till' => NULL
                ]);
                DB::table('v_doctor_treatments')->insert([
                    'id' => ($i+$del+1),
                    'treatment_id' => 1,
                    'doctor_id' => 1,
                    'from' => now(),
                    'till' => NULL
                ]);
                $t = rand(11,12);
                $t2 = ($t==12)?11:12;
                $from = date_create_from_format('Y-m-d',DB::table('treatments')->where('id',$i)->value('start'));
                $till = now();
                $interval = $from->diff($till);
                $interval->y = $interval->y/2;
                $interval->m = $interval->m/2;
                $interval->d = $interval->d/2;
                $mid = $from->add($interval);
                DB::table('v_doctor_treatments')
                ->where('id',$i+$del)
                ->update(['doctor_id' => $t,'treatment_id' => $i ,'till'=>$mid,'from'=> DB::table('treatments')->where('id',$i)->value('start')]);
                DB::table('v_doctor_treatments')
                ->where('id',$i+1+$del)
                ->update(['doctor_id' => $t2,'treatment_id' => $i ,'till'=>NULL,'from'=> $mid]);
                $del++;
            }
        }
    }

    private function TestUsers(){

        /*
        $id = DB::table('users')->where('email','=','DenisMail@whatever.com')->value('id');

        DB::table('treatments')->insert([
            'next_visit' => '2022-11-28',
            'age' => 22,
            'gender' => 'Male',
            'diagnosis' => '2018-05-15',
            'start' => '2018-06-01',
            'patient_id' => $id
        ]);

        $treatment_id = DB::table('treatments')->where('patient_id','=',$id)->value('id');

        DB::table('v_doctor_treatments')->insert([
            'from' => '2018-06-01',
            'till' => NULL,
            'doctor_id' => 12,
            'treatment_id' => $treatment_id
        ]);*/

        //Doktor
        DB::table('users')->insert([
            'id' => 11,
            'name' => "Frankie",
            'last_name' => "Stein",
            'email' => "doctor@whatever.com",
            'type' => 1,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("doctor"),
        ]);

        DB::table('users')->insert([
            'id' => 12,
            'name' => "Tomy d'Angelo",
            'last_name' => "gg",
            'email' => "tangelo@salieri.com",
            'type' => 1,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("Mariani"),
        ]);

        //Firma
        DB::table('users')->insert([
            'id' => 13,
            'name' => "Saburo",
            'last_name' => "Arasaka",
            'email' => "company@whatever.com",
            'type' => 2,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("company"),
        ]);

        //Firma
        DB::table('users')->insert([
            'id' => 14,
            'name' => "Saburo1",
            'last_name' => "Arasaka",
            'email' => "sarasaka2@whatever.com",
            'type' => 2,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("Heslo123"),
        ]);

        //Firma
        DB::table('users')->insert([
            'id' => 15,
            'name' => "Saburo2",
            'last_name' => "Arasaka",
            'email' => "sarasaka3@whatever.com",
            'type' => 2,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("Heslo123"),
        ]);

        //Firma
        DB::table('users')->insert([
            'id' => 16,
            'name' => "Saburo3",
            'last_name' => "Arasaka",
            'email' => "sarasaka4@whatever.com",
            'type' => 2,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("Heslo123"),
        ]);

        //Firma
        DB::table('users')->insert([
            'id' => 17,
            'name' => "Saburo4",
            'last_name' => "Arasaka",
            'email' => "sarasaka5@whatever.com",
            'type' => 2,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("Heslo123"),
        ]);

        //Admin
        DB::table('users')->insert([
            'id' => 18,
            'name' => "Tomas",
            'last_name' => "Lukac",
            'email' => "admin@whatever.com",
            'type' => 3,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'password' => Hash::make("admin"),
        ]);
    }

}

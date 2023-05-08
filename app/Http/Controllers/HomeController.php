<?php
/**
 * author: xhoril01
 * requests: from mulitple views
 * view: multiple views
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;

//This class returns the correct view based on user who requested it
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($id)
    {
        $type = User::where('id',$id)->value('type');
        
        if($type == 0) return view('my_treatment');
        else if($type == 1) return view('patients');
        else if($type == 2) return view('company_info');
        else if($type == 3) return view('doctors');
        else return view('home');
    }
}

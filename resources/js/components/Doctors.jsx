/**
 * author: xhoril01
 * component: Doctors
 * view: Admin view, doctors list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import DoctorRow from './Tables/DoctorRow';
import DocAdd from './Modals/DocAdd';

// Class component - this component is a row in table in admin view, doctors list
class Doctors extends Component{

    constructor(props){
        super(props);
        this.state = {
            doctors: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    //gets list of doctors
    getDocsInfo=async()=>{
        let response = await axios.get('/home/get/doctors/info');
        this.state.doctors = response.data;
        console.log(this.state.doctors);
    }

    //inner table refresh
    refresh=async()=>{
        await this.getDocsInfo();
        this.cleanRows();
        //console.log(this.state.doctors);
        this.spawnRows();
    }
    
    //add new rows
    spawnRows=()=>{
        const myNode = document.getElementById("my_t_body");
        for(let i = 0; i < this.state.doctors.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<DoctorRow key={i} data={this.state.doctors[i]} handler={this.refresh} />,elem);
            myNode.appendChild(elem); 
        };   
    }

    //clean old rows
    cleanRows=()=>{
        var myNode = document.getElementById("my_t_body");      
        for(var i = myNode.rows.length - 1; i >= 0; i--)
        {
            myNode.deleteRow(i);
        } 
    }

    //return html text
    render(){
        return(
            <div className='container'>
                <ToastContainer/>
                <DocAdd handler={this.refresh}/>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'> DOKTORI </div>
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Meno</th>
                                        <th scope='col'>Priezvisko</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Možnosti</th>
                                    </tr>
                                </thead>

                                <tbody id="my_t_body">

                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
            </div>
            );
        }
}

export default Doctors;

if (document.getElementById('doctor_view')) {
    ReactDOM.render(<Doctors/>, document.getElementById('doctor_view'));
}
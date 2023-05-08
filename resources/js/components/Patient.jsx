/**
 * author: xhoril01
 * component: Patient
 * view: Doctor view, patient list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientRow from './Tables/PatientRow';
import PatientAdd from './Modals/PatientAdd';

// Class component - this component is a list of patients in doctor view
class Patient extends Component{

    constructor(props){
        super(props);
        this.state = {
            patients: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    //refresh list
    refresh=async()=>{
        await this.getPatsInfo();
        this.clear();
        this.create();
    }

    //add new rows
    create=()=>{
        const myNode = document.getElementById("myttbd");
        for(let i = 0; i < this.state.patients.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<PatientRow key={i} data={this.state.patients[i]} handler={this.refresh} />,elem);
            myNode.appendChild(elem); 
        };   
    }

    //remove old rows
    clear=()=>{
        var myNode = document.getElementById("myttbd");      
        for(var i = myNode.rows.length - 1; i >= 0; i--)
        {
            myNode.deleteRow(i);
        } 
    }

    //get patient list
    getPatsInfo=async()=>{
        let response = await axios.get('/home/get/patients/info');
        this.state.patients = response.data;
    }

    //return html text
    render(){
        return(
            <div className='container'>
                <ToastContainer/>
                <PatientAdd handler={this.refresh}/>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header text-center'><h2>PACIENTI</h2> </div>
                            <table className="table table-hover">
                                <thead className="thead-dark ">
                                    <tr className='align-middle'>
                                        <th scope='col'><p className='fs-5' style={{ marginBottom: 0 }}>#</p></th>
                                        <th scope='col'><p className='fs-5' style={{ marginBottom: 0 }}>Meno</p></th>
                                        <th scope='col'><p className='fs-5' style={{ marginBottom: 0 }}>Priezvisko</p></th>
                                        <th scope='col'><p className='fs-5' style={{ marginBottom: 0 }}>Možnosti</p></th>
                                    </tr>
                                </thead>

                                <tbody id="myttbd">
                                    { this.state.patients.map(function(x,i) {
                                        return <PatientRow key={i} data={x} />
                                    })} 
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
            </div>
            );
        }
}

export default Patient;

if (document.getElementById('patient_view')) {
    ReactDOM.render(<Patient/>, document.getElementById('patient_view'));
}
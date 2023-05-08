/**
 * author: xhoril01
 * component: PatientInfo
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillXCircleFill } from "react-icons/bs";

import PatientImg from './PatientImg';
import DoctorReport from './Tables/DoctorReport';
import PatientReport from './Tables/PatientReport';
import PatientStates from './Tables/PatientStates';
import PatientDrugs from './Tables/PatientDrugs';
import StateAdd from './Modals/StateAdd';
import PatDrugAdd from './Modals/PatDrugAdd';
import NewDocReport from './Modals/NewDocReport';
import ChangeVisitDate from './Modals/ChangeVisitDate';
import EndPatient from './Modals/EndPatient';

// Class component - this component is a main component in doctor view patient detail
class PatientInfo extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            patName: null,
            patLast: null,
            patMail: null,
            patGen: null,
            patAge: null,
            docReports: [],
            patReports: [],
            activeStates: [],
            inactiveStates: [],
            activeDrugs: [],
            inactiveDrugs: [],
            stateNames: [],
            nextVisit: null
        }
    }

    componentDidMount() {
        this.getPatientDataBasic();
        this.getPatientDataDReports();
        this.getPatientDataPReports();
        this.getPatientDataMedicines();
        this.getPatientDataStates();
        this.drugsRefresh();
        this.statesRefresh();
    }

    //Get basic patient info, such as name, gender, age...
    getPatientDataBasic=async()=>{
        let response = await axios.post('/home/prehlad_pacientov/info/get/pats/data', {patient_id: this.props.id});
        this.state.patName = response.data[0].name;
        this.state.patLast = response.data[0].last_name;
        this.state.patMail = response.data[0].email;
        this.state.patGen = response.data[0].gender;
        this.state.patAge = response.data[0].age;
        this.state.nextVisit = response.data[0].next_visit;
        this.dataSpawn();   
    }

    //Get all doctor reports
    getPatientDataDReports=async()=>{
        let response = await axios.post('/home/prehlad_pacientov/info/get/docs/reports', {patient_id: this.props.id});
        this.state.docReports = response.data;
        this.dreportsSpawn();
    }

    //Get all patient reports
    getPatientDataPReports=async()=>{
        let response = await axios.post('/home/prehlad_pacientov/info/get/pats/reports', {patient_id: this.props.id});
        this.state.patReports = response.data;
        this.preportsSpawn();
    }

    //Get all states
    getPatientDataStates=async()=>{
        let res1 = await axios.post('/home/prehlad_pacientov/info/get/pats/active/states',{patient_id: this.props.id});
        this.state.activeStates = res1.data;

        let res2 = await axios.post('/home/prehlad_pacientov/info/get/pats/inactive/states',{patient_id: this.props.id});
        this.state.inactiveStates = res2.data;
    }

    //get all medicines
    getPatientDataMedicines=async()=>{
        let res1 = await axios.post('/home/prehlad_pacientov/info/get/pats/active/drugs',{patient_id: this.props.id});
        this.state.activeDrugs = res1.data;

        let res2 = await axios.post('/home/prehlad_pacientov/info/get/pats/inactive/drugs',{patient_id: this.props.id});
        this.state.inactiveDrugs = res2.data;
    }

    //refresh states list
    statesRefresh=async()=>{
        await this.getPatientDataStates();
        this.statesClean();
        this.statesSpawn();
    }

    //refresh medicines list
    drugsRefresh=async()=>{
        await this.getPatientDataMedicines();
        this.drugsClean();
        this.drugsSpawn();
    }

    //remove old states
    statesClean=()=>{
        var myNode = document.getElementById("my_tab_states");      
        for(var i = myNode.rows.length - 1; i >= 0; i--)
        {
            myNode.deleteRow(i);
        } 
    }

    //add new states
    statesSpawn=()=>{
        const myNode = document.getElementById("my_tab_states");
        for(let i = 0; i < this.state.activeStates.length;i++){
            const elem = document.createElement("tr");
            elem.className='align-middle';
            ReactDOM.render(<PatientStates key={i} data={this.state.activeStates[i]} handler={this.statesRefresh} />,elem);
            myNode.appendChild(elem); 
        };
        for(let i = 0; i < this.state.inactiveStates.length;i++){
            const elem = document.createElement("tr");
            elem.className='align-middle';
            ReactDOM.render(<PatientStates key={i} data={this.state.inactiveStates[i]} handler={this.statesRefresh} />,elem);
            myNode.appendChild(elem); 
        };  
    }

    //remove old medicines
    drugsClean=()=>{
        var myNode = document.getElementById("my_tab_drugs");      
        for(var i = myNode.rows.length - 1; i >= 0; i--)
        {
            myNode.deleteRow(i);
        } 
    }

    //add new medicines
    drugsSpawn=()=>{
        const myNode = document.getElementById("my_tab_drugs");
        for(let i = 0; i < this.state.activeDrugs.length;i++){
            const elem = document.createElement("tr");
            elem.className='align-middle';
            ReactDOM.render(<PatientDrugs key={i} data={this.state.activeDrugs[i]} handler={this.drugsRefresh} />,elem);
            myNode.appendChild(elem); 
        };
        for(let i = 0; i < this.state.inactiveDrugs.length;i++){
            const elem = document.createElement("tr");
            elem.className='align-middle';
            ReactDOM.render(<PatientDrugs key={i} data={this.state.inactiveDrugs[i]} handler={this.drugsRefresh} />,elem);
            myNode.appendChild(elem); 
        }; 
    }

    //refresh basic data
    dataRefresh=()=>{
        this.dataRemove();
        this.getPatientDataBasic();
    }

    //add new basic data
    dataSpawn=()=>{
        const myNode = document.getElementById("pat_data");
        const elem = document.createElement("div");
        ReactDOM.render(
        <>
        <strong>Meno: </strong>  {this.state.patName}<br/><br/>
                                <strong>Priezvisko: </strong>  { this.state.patLast }<br/><br/>
                                <strong>Email: </strong>  { this.state.patMail }<br/><br/>
                                <strong>Vek: </strong>  { this.state.patAge }<br/><br/>
                                <strong>Pohlavie: </strong>  { this.state.patGen }<br/><br/>
                                <strong>Dátum najbližšej kontroly: </strong>  {this.state.nextVisit} <br/>
        </>
        ,elem);
        myNode.appendChild(elem); 
    }

    //remove old basic data
    dataRemove=()=>{
        var myNode = document.getElementById("pat_data");      
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    }

    //refresh doctor reports
    dreportsRefresh=()=>{
        this.getPatientDataDReports();
        this.dreportsClean();
        this.dreportsSpawn();
    }

    //remove old doc reports
    dreportsClean=()=>{
        var myNode = document.getElementById("my_tab_d_reports");      
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    }

    //add new doc reports
    dreportsSpawn=()=>{
        const myNode = document.getElementById("my_tab_d_reports");
        for(let i = 0; i < this.state.docReports.length;i++){
            const elem = document.createElement("tr");
            elem.className='align-middle';
            ReactDOM.render(<DoctorReport key={i} data={this.state.docReports[i]}/>,elem);
            myNode.appendChild(elem); 
        };
    }

    //add new patient reports
    preportsSpawn=()=>{
        const myNode = document.getElementById("my_tab_p_reports");
        for(let i = 0; i < this.state.patReports.length;i++){
            const elem = document.createElement("tr");
            elem.className='align-middle';
            ReactDOM.render(<PatientReport key={i} data={this.state.patReports[i]}/>,elem);
            myNode.appendChild(elem); 
        };
    }

    //return html text
    render(){
        return(
            <div className='container'>
                <ToastContainer/>
                <div className='card border-dark bg-white'>
                    <div className='card-header text-center'>
                        <h2><strong> INFORMÁCIE O PACIENTOVI </strong></h2>
                    </div>

                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-4'> 
                                <PatientImg gender={ this.state.patGen }/>
                            </div>

                            <div className='col-md-4 fs-5' id="pat_data">
                                
                            </div>

                            <div className='col-md-4 d-flex flex-column justify-content-around align-center'>
                                <div className='p-2'>
                                    <NewDocReport patient_id = { this.props.id } handler={this.dreportsRefresh}/>
                                </div>

                                <div className='p-2'>
                                    <button type='button' 
                                        className='btn btn-primary fs-5' 
                                        style={{ padding: 12 }}
                                        data-bs-toggle='modal'
                                        data-bs-target={'#changeVisitDate_' + this.props.id}>
                                                                    
                                            Zmeniť dátum kontroly
                                    </button>
                                    <ChangeVisitDate patient_id = {this.props.id} date = {this.state.nextVisit} handler={this.dataRefresh}/>

                                </div>
                                    
                                <div className='p-2'>
                                    <button type='button' 
                                        className='btn btn-danger fs-5' 
                                        style={{ padding: 12 }}
                                        data-bs-toggle='modal'
                                        data-bs-target={'#endPatient_' + this.props.id}>
                                                                    
                                            <BsFillXCircleFill/> Ukončiť pacienta
                                    </button>
                                    <EndPatient patient_id = {this.props.id}/>
                                </div>                                 
                            </div>
                        </div>
                        
                        <div><br/></div>

                        <div className='row justify-content-center'>

                            <div className='col-md-6'>
                                
                                <div className='card bg-light border-secondary mb-3 text-center overflow-scroll' style={{ height: 350 }}>
                                    <div className='card-header text-center'>
                                        <h4><strong><em> Stavy pacienta </em></strong></h4>
                                    </div>

                                    <div className='card-body'>
                                        <table className="table table-responsive-md">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope='col'>Stav</th>
                                                    <th scope='col'>Od</th>
                                                    <th scope='col'>Do</th>
                                                    <th scope='col'>Aktívne</th>
                                                </tr>
                                            </thead>
                                                
                                            <tbody id="my_tab_states">
                                            </tbody>
                                        </table>

                                        <StateAdd patient_id = {this.props.id} handler={this.statesRefresh}/>

                                    </div>
                                    
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='card bg-light border-secondary mb-3 text-center overflow-scroll' style={{ height: 350 }}>
                                    
                                    <div className='card-header text-center'>
                                        <h4><strong><em> Lieky pacienta </em></strong></h4>
                                    </div>

                                    <div className='card-body'>
                                        <table className="table table-responsive-md">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope='col'>Názov</th>
                                                    <th scope='col'>Dávka</th>
                                                    <th scope='col'>Od</th>
                                                    <th scope='col'>Do</th>
                                                    <th scope='col'>Aktívne</th>
                                                </tr>
                                            </thead>

                                            <tbody id="my_tab_drugs">
                                            </tbody>
                                        </table>

                                        <PatDrugAdd patient_id = {this.props.id} handler={this.drugsRefresh}/>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center'>
                            <div className='col-md-6'>
                                <div className='card bg-light border-secondary mb-3 text-center overflow-scroll' style={{ height: 350 }}>
                                    
                                    <div className='card-header text-center'>
                                        <h4><strong><em> Hlásenia doktora </em></strong></h4>
                                    </div>

                                    <div className='card-body'>
                                        <table className="table table-responsive-md">
                                            <thead className="thead-dark">
                                                <tr className='align-middle'>
                                                    <th scope='col'>Dátum</th>
                                                    <th scope='col'></th>
                                                </tr>
                                            </thead>

                                            <tbody id="my_tab_d_reports">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='card bg-light border-secondary mb-3 text-center overflow-scroll' style={{ height: 350 }}>
                                    
                                    <div className='card-header text-center'>
                                        <h4><strong><em> Hlásenia pacienta </em></strong></h4>
                                    </div>

                                    <div className='card-body'>
                                        
                                        <table className="table table-responsive-md">
                                            <thead className="thead-dark">
                                                <tr className='align-middle'>
                                                    <th scope='col'><h7>Dátum</h7></th>
                                                    <th scope='col'></th>
                                                </tr>
                                            </thead>

                                            <tbody id="my_tab_p_reports">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            );
        }
}

export default PatientInfo;

if (document.getElementById('patient_info')) {
    ReactDOM.render(<PatientInfo id={document.getElementById('patient_info').getAttribute("patient_id")}/>, document.getElementById('patient_info'));
}
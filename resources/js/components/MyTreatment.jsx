/**
 * author: xhoril01
 * component: MyTreatment
 * view: Patient view
 */


import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientImg from './PatientImg';
import TreatmentDrugs from './Tables/TreatmentDrugs';
import NewPatReport from './Modals/NewPatReport';

// Class component - this component is a main component of patient view
class MyTreatment extends Component{

    constructor(props){
        super(props);
        this.state = {
            patient_id: null,
            first: null,
            last: null,
            mail: null,
            gender: null,
            age: null,
            doctor_id: null,
            next_visit: null,
            activeDrugs: [],
            inactiveDrugs: []
        };
    }

    componentDidMount() {
        this.getId();
    }

    //get patient id
    getId = () => {
        axios.get('/home/get/user/id').then((response) => {
            this.setState({
                patient_id: response.data
            });
            
        })

        setTimeout(() =>{
            this.getPatsInfo();
        },1500);     
    }

    //get patient info
    getPatsInfo = () => {
        axios.post('/home/get/patients/data', {
            patient_id: this.state.patient_id
        }).then((response) => {
            this.setState({
                first: response.data[0].name,
                last: response.data[0].last_name,
                mail: response.data[0].email,
                gender: response.data[0].gender,
                age: response.data[0].age,
                doctor_id: response.data[0].doctor_id,
                next_visit: response.data[0].next_visit
            });
        });

        axios.post('/home/get/active/drugs',{
            patient_id: this.state.patient_id
        }).then((response) => {
            this.setState({
                activeDrugs: response.data
            }); 
        });

        axios.post('/home/get/inactive/drugs',{
            patient_id: this.state.patient_id
        }).then((response) => {
            this.setState({
                inactiveDrugs: response.data
            }); 
        });
    }

    //return html text
    render(){
        return(
            <div className='container'>
                <ToastContainer/>
                <div className='card border-dark bg-white'>
                    <div className='card-header text-center'>
                        <h2><strong> KARTA PACIENTA </strong></h2>
                    </div>

                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-4'> 
                                <PatientImg gender={ this.state.gender }/>
                            </div>

                            <div className='col-md-4 fs-5'>
                                <strong>Meno: </strong>  { this.state.first }<br/><br/>
                                <strong>Priezvisko: </strong>  { this.state.last }<br/><br/>
                                <strong>Email: </strong>  { this.state.mail }<br/><br/>
                                <strong>Vek: </strong>  { this.state.age }<br/><br/>
                                <strong>Pohlavie: </strong>  { this.state.gender }<br/><br/>
                                <strong>Dátum najbližšej kontroly: </strong>  {this.state.next_visit} <br/>
                            </div>

                            <div className='col-md-4 d-flex flex-column justify-content-center'>
                                <div className='p-2'>
                                    <NewPatReport patient_id = { this.state.patient_id } />
                                </div>
                                
                            </div>
                        </div>

                        <div><br/></div>

                        <div className='row justify-content-center'>
                            <div className='col-md-6'>
                                <div className='card bg-light border-secondary mb-3 text-center overflow-scroll' style={{ height: 350 }}>
                                    <div className='card-header text-center'>
                                        <h4><strong><em> Užívanie liekov </em></strong></h4>
                                    </div>

                                    <div className='card-body'>
                                        <table className="table table-responsive-md">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope='col'>Názov</th>
                                                    <th scope='col'>Od</th>
                                                    <th scope='col'>Do</th>
                                                    <th scope='col'>Aktívne</th>
                                                    <th scope='col'>Info</th>
                                                </tr>
                                            </thead>
                                                
                                            <tbody>
                                                { this.state.activeDrugs.map(function(x,i) {
                                                    return <TreatmentDrugs key={i} data={x}/> 
                                                })}

                                                { this.state.inactiveDrugs.map(function(x,i) {
                                                    return <TreatmentDrugs key={i} data={x}/>
                                                })}
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

export default MyTreatment;

if (document.getElementById('my_treatment')) {
    ReactDOM.render(<MyTreatment/>, document.getElementById('my_treatment'));
}
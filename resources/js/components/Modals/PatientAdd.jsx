/**
 * author: xhoril01
 * component: PatDrugAdd
 * view: Doctor view, patient list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in doctor view, patient list, modal used for adding a new patient
class PatientAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            patName: null,
            patLast: null,
            patMail: null,
            patPwd: null,
            patGender: null,
            patAge: null,
            diagnosisDate: null,
            doctor_id: null
        }
    }

    //change patient name
    patNameInput = (event) =>{
        this.setState({
            patName: event.target.value
        })
    }

    //change patient last name
    patLastInput = (event) =>{
        this.setState({
            patLast: event.target.value
        })
    }

    //change patient email
    patEmailInput = (event) =>{
        this.setState({
            patMail: event.target.value
        })
    }

    //change password input
    patPwdInput = (event) =>{
        this.setState({
            patPwd: event.target.value
        })
    }

    //change patient gender
    patGenderInput = (event) =>{
        this.setState({
            patGender: event.target.value
        })
    }

    //change patient age
    patAgeInput = (event) =>{
        this.setState({
            patAge: event.target.value
        })
    }

    //change date start 
    dateInput = (event) =>{
        this.setState({
            diagnosisDate: event.target.value
        })
    }

    //get user id
    getId = () => {
        axios.get('/home/get/user/id').then((response) => {
            this.setState({
                doctor_id: response.data
            });
            
        })

        setTimeout(() =>{
            this.patAdd();
        },500);     
    }

    //set new patient
    patAdd = () => {
        axios.post('/home/add/patient', {
            patName: this.state.patName,
            patLast: this.state.patLast,
            patMail: this.state.patMail,
            patPwd: this.state.patPwd,
            patGender: this.state.patGender,
            patAge: this.state.patAge,
            date: this.state.diagnosisDate,
            doctor_id: this.state.doctor_id
        }).then(() => {
            toast.success("Údaje boli pridané");
            this.props.handler();
        });
    }

    //return html text
    render(){
        return(
            <>
                <div className='row text-right mb-3 pb-3 fs-4'>
                    <button className='btn btn-primary text-right col-3 offset-md-9'
                            data-bs-toggle='modal'
                            data-bs-target='#docAdd'
                    >
                        Pridať pacienta
                    </button>
                </div>
                <div className="modal" id='docAdd' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pridať pacienta</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='form'>
                                    <div className='form-group'>
                                        <input type="text"
                                               id="patName"
                                               className='form-control mb-3'
                                               placeholder='Meno pacienta'
                                               onChange={ this.patNameInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="patLast"
                                               className='form-control mb-3'
                                               placeholder='Priezvisko pacienta'
                                               onChange={ this.patLastInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="patMail"
                                               className='form-control mb-3'
                                               placeholder='Email pacienta'
                                               onChange={ this.patEmailInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="password"
                                               id="patPwd"
                                               className='form-control mb-3 password'
                                               placeholder='Heslo'
                                               onChange={ this.patPwdInput }
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <input type="number"
                                               id="patAge"
                                               className='form-control mb-3 password'
                                               placeholder='Vek'
                                               min='0'
                                               onChange={ this.patAgeInput }
                                        />
                                    </div>

                                    <div className='form-group'>
                                            <select className="form-select" aria-label="Gen select" onChange={this.patGenderInput} required>
                                                <option selected disabled> Zvoľte pohlavie</option>
                                                <option value="Male">Muž</option>    
                                                <option value="Female">Žena</option>    
                                                <option value="Other">Iné</option>
                                            </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="date pick">Dátum diagnózy</label>
                                        <label/>
                                        <input type="date" 
                                               class="form-control" 
                                               aria-describedby="dateChange" 
                                               onChange={this.dateInput}
                                                />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <input type="submit"
                                    className='btn btn-info'
                                    value="Vytvoriť"
                                    onClick={ this.getId }
                                    data-bs-dismiss="modal"
                                />

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Zatvoriť</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PatientAdd;
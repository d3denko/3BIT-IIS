/**
 * author: xhoril01
 * component: PatDrugAdd
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAddCircle } from "react-icons/io5";

// Class component - this component is used in doctor view, patient detail, modal used for adding a new medicine prescription
class PatDrugAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            drugs: [],
            chosenDrug: null,
            chosenPeriod: null,
            chosenTime: 1,
            main: 0
        }
    }

    componentDidMount() {
        this.drugNames();
    }

    //get names of all medicines
    drugNames = () => {
        axios.get('/home/prehlad_pacientov/info/get/drugs').then((response) => {
            this.setState({
                drugs: response.data
            })
        })
    }

    //add new prescription
    drugAdd = () => {
        let self=this;
        axios.post('/home/prehlad_pacientov/info/add/drug', { 
            drug: this.state.chosenDrug,
            period: this.state.chosenPeriod,
            time: this.state.chosenTime,
            patient_id: this.props.patient_id,
            main: this.state.main
        }).then(() => {
            toast.success("Liek bol pridaný");
            
            self.props.handler();
        })
    }

    //change medicine name
    drugChange = (event) => {
        this.setState({
            chosenDrug: event.target.value 
        })
    }

    //change prescription period
    periodChange = (event) => {
        this.setState({
            chosenPeriod: event.target.value 
        })
    }

    //change prescription time
    timeChange = (event) => {
        this.setState({
            chosenTime: event.target.value 
        })
    }

    //change flag, if medicine is used mainly for treating main condition
    mainChange = (event) => {
        this.setState({
            main: event.target.value 
        })
    }

    //return html text
    render(){
        return(
            <>
                <div className='sticky-bottom'>
                    <button className='btn btn-primary text-center'
                            data-bs-toggle='modal'
                            data-bs-target='#patDrugAdd'>

                                <IoAddCircle/>  Pridať liek
                    </button>
                </div>
                
                <div className="modal" id='patDrugAdd' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pridať stav</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='form'>
                                    <select className="form-select" onChange={this.drugChange}>
                                        <option selected disabled> Zvoľte liek </option>
                                        
                                        {this.state.drugs.map(displaydrugs => (
                                            <option value={displaydrugs.id}>{displaydrugs.name}</option>
                                        ))}

                                    </select>
                                    
                                    <div><br/></div>

                                    <select className="form-select" onChange={this.periodChange}>
                                        <option selected disabled> Zvoľte dobu užívania </option>
                                        
                                        <option value="1">Deň</option>
                                        <option value="2">Týždeň</option>
                                        <option value="3">Mesiac</option>
                                        <option value="4">3 mesiace</option>
                                        <option value="5">6 mesiacov</option>

                                    </select>
                                    
                                    <div><br/></div>

                                    <div className='form-group'>
                                        <strong>Zvoľte pravidelnosť užívania</strong><br/> 
                                        <input type="text"
                                            id="dosageTime"
                                            className='form-control mb-3'
                                            value={ this.state.chosenTime }
                                            onChange={ this.timeChange }
                                        />
                                    </div>

                                    <select className="form-select" onChange={this.mainChange}>
                                        <option selected disabled> Hlavný liek?</option>
                                        
                                        <option value="1">Áno</option>
                                        <option value="0">Nie</option>

                                    </select>

                                    
                                </form>
                            </div>
                            <div className="modal-footer">
                                <input type="button"
                                    className='btn btn-info fs-5'
                                    value="Pridať"
                                    onClick={ this.drugAdd }
                                    data-bs-dismiss="modal"
                                />

                                <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Zatvoriť</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PatDrugAdd;
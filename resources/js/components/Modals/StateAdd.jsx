/**
 * author: xhoril01
 * component: StateAdd
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAddCircle } from "react-icons/io5";

// Class component - this component is used in doctor view, patient detail, modal used for adding a state of patient
class StateAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            states: [],
            chosenState: null,
        }
    }

    componentDidMount() {
        this.stateNames();
    }

    //get watched states
    stateNames = () => {
        axios.get('/home/prehlad_pacientov/info/get/states').then((response) => {
            this.setState({
                states: response.data
            })
        })
    }

    //set new state
    stateAdd = () => {
        let self=this;
        axios.post('/home/prehlad_pacientov/info/add/state', { 
            state: this.state.chosenState,
            patient_id: this.props.patient_id
        }).then(() => {
            toast.success("Stav bol pridaný");
            
            self.props.handler();
        })
    }

    //change chosen state
    stateChange = (event) => {
        this.setState({
            chosenState: event.target.value 
        })
    }

    //return html text
    render(){
        return(
            <>
                <div className='sticky-bottom'>
                    <button className='btn btn-primary text-center'
                            data-bs-toggle='modal'
                            data-bs-target='#stateAdd'>

                                <IoAddCircle/>  Pridať stav
                    </button>
                </div>
                
                
                <div className="modal" id='stateAdd' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pridať stav</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='form'>
                                    <select className="form-select" aria-label="State select" onChange={this.stateChange}>
                                        <option selected disabled> Zvoľte stav </option>
                                        
                                        {this.state.states.map(displayStates => (
                                            <option>{displayStates.name}</option>
                                        ))}

                                    </select>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <input type="button"
                                    className='btn btn-info fs-5'
                                    value="Pridať"
                                    onClick={ this.stateAdd }
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

export default StateAdd;
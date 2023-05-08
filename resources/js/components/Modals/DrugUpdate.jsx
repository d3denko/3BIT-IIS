/**
 * author: xhoril01
 * component: DrugUpdate
 * view: Medicine list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in medicine list, it is a pop up modal for medicine updating
class DrugUpdate extends Component{

    constructor(props){
        super(props);

        this.state = {
            drugName: null,
            drugVers: null,
            drugType: null,
            drugComp_ID: null,
            compName: null
        }
    }

    //change drug name
    drugNameChange = (event) =>{
        this.setState({
            drugName: event.target.value
        });
    }

    //change drug version
    drugVersChange = (event) =>{
        this.setState({
            drugVers: event.target.value
        });
    }

    //change drug type
    drugTypeChange = (event) =>{
        this.setState({
            drugType: event.target.value
        });
    }

    //change company
    compNameChange = (event) =>{
        this.setState({
            compName: event.target.value
        });
    }

    //set current data
    static getDerivedStateFromProps(props, current_state){
        let drugUpdate = {
            drugName: null,
            drugVers: null,
            drugType: null,
            compName: null
        };

        // Update from input
        if(current_state.drugName && (current_state.drugName !== props.data.drugName)) return null;
        if(current_state.drugVers && (current_state.drugVers !== props.data.drugVers)) return null;
        if(current_state.drugType && (current_state.drugType !== props.data.drugType)) return null;
        if(current_state.compName && (current_state.compName !== props.data.compName)) return null;

        // Update from props
        if( current_state.drugName !== props.data.drugName || current_state.drugName === props.data.drugName ){
            drugUpdate.drugName = props.data.drugName;
        }

        if( current_state.drugVers !== props.data.drugVers || current_state.drugVers === props.data.drugVers ){
            drugUpdate.drugVers = props.data.drugVers;
        }

        if( current_state.drugType !== props.data.drugType || current_state.drugType === props.data.drugType ){
            drugUpdate.drugType = props.data.drugType;
        }

        if( current_state.compName !== props.data.compName || current_state.compName === props.data.compName ){
            drugUpdate.compName = props.data.compName;
        }

        return drugUpdate;
    }

    //set changes
    updateDrug = () => {
        axios.post('/home/update/drug/info', {
            drugID: this.props.drugID,
            drugName: this.state.drugName,
            drugVers: this.state.drugVers,
            drugType: this.state.drugType,
            compName: this.state.compName

        }).then(() => {
            toast.success("Údaje boli aktualizované");
            this.props.handler();
        });
    }

    //return html text
    render(){
        return(
            <div class="modal" id={'drugUpdate_' + this.props.drugID } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Aktualizovať informácie</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                    <form className='form'>
                            <div className='form-group'>
                                <strong>Názov lieku</strong><br/> 
                                <input type="text"
                                       id="drugName"
                                       className='form-control mb-3'
                                       value={ this.state.drugName ?? ""}
                                       onChange={ this.drugNameChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Verzia lieku</strong><br/> 
                                <input type="text"
                                       id="drugVers"
                                       className='form-control mb-3'
                                       value={ this.state.drugVers ?? ""}
                                       onChange={ this.drugVersChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Typ lieku</strong><br/> 
                                <input type="text"
                                       id="drugType"
                                       className='form-control mb-3'
                                       value={ this.state.drugType ?? ""}
                                       onChange={ this.drugTypeChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Spoločnosť</strong><br/> 
                                <input type="text"
                                       id="compName"
                                       className='form-control mb-3'
                                       value={ this.state.compName ?? ""}
                                       onChange={ this.compNameChange }
                                />
                            </div>

                        </form>
                    </div>

                    <div class="modal-footer">
                        <input type="submit"
                               className='btn btn-info'
                               value="Aktualizovať"
                               onClick={ this.updateDrug }
                               data-bs-dismiss="modal"
                        />
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zavrieť</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DrugUpdate;
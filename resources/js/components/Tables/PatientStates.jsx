/**
 * author: xhoril01
 * component: PatientStates
 * view: Doctor view, Patient detail, states list
 */

import React,{ Component } from 'react';
import { BsFillXCircleFill } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import StateClose from '../Modals/StateClose';

// Class component - this component is a row in table in doctor view,patient detail, states list
class PatientStates extends Component{

    constructor(props){
        super(props);

    }

    //checks if state is still active
    sign() {  
        if(this.props.data.till == null) 
            return(
                    <td>
                        <StateClose stateID = {this.props.data.substate_id} handler={this.props.handler} />
                        <button type="button"
                                class="btn btn-outline-danger" 
                                data-bs-toggle="modal" 
                                data-bs-target={'#stateClose_' + this.props.data.substate_id }
                                >
                                    <BsXCircle/> Ukončiť
                        </button>
                    </td>
                );
        
        
        else return(<td><p style={{ marginBottom: 0 }} className='text-secondary'><BsFillXCircleFill/></p></td>);
    }

    //gets data from database
    getInfo = (id) => {
        axios.post('/home/get/drug/details', {drugID: id}).then((response) => {
            this.setState({
                drugName: response.data.name,
                drugVers: response.data.version,
                drugType: response.data.type,
                drugComp_ID: response.company_id,
            })
        });

        axios.post('/home/get/comp/name', {drugID: id}).then((response) => {
            this.setState({
                compName: response.data
            });
        });
    }

    //returns html text
    render(){
        return(
            <>    
                <th scope='row'><p style={{ marginBottom: 0 }}>{ this.props.data.name }</p></th>
                <td><p style={{ marginBottom: 0 }}> { this.props.data.from } </p></td>
                <td><p style={{ marginBottom: 0 }}> { this.props.data.till } </p></td>
                { this.sign() }
            </>
        );
    }
}

export default PatientStates;
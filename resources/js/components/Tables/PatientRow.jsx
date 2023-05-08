/**
 * author: xhoril01
 * component: PatientRow
 * view: Doctor view, Patient list
 */

import React,{ Component } from 'react';
import { BsInfoCircle } from "react-icons/bs";

// Class component - this component is a row in table in doctor view,patient list
class PatientRow extends Component{

    constructor(props){
        super(props);
    }

    //returns html text
    render(){
        return(
            <>    
                <th scope='row'><p className='fs-5' style={{ marginBottom: 0 }}>{ this.props.data.patient_id }</p></th>
                <td><p className='fs-5' style={{ marginBottom: 0 }}> { this.props.data.name } </p></td>
                <td><p className='fs-5' style={{ marginBottom: 0 }}> { this.props.data.last_name } </p></td>
                <td>
                    <a href={ '/home/prehlad_pacientov/info/' + this.props.data.patient_id } className="fs-4"><BsInfoCircle/></a>
                </td>
            </>
        )
    }
}

export default PatientRow;
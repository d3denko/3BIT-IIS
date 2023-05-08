/**
 * author: xhoril01
 * component: PatientReport
 * view: Doctor view, Patient detail, Patient report list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { BsSearch } from "react-icons/bs";
import PatReportInfo from '../Modals/PatReportInfo';

// Class component - this component is a row in table in doctor view,patient detail, patient report list
class PatientReport extends Component{

    constructor(props){
        super(props);

        this.state = {
            q1: null, q11: null, 
            q2: null, q12: null,
            q3: null, q13: null,
            q4: null, q14: null,
            q5: null, q15: null,
            q6: null, q16: null,
            q7: null, q17: null,
            q8: null, q18: null,
            q9: null, q19: null,
            q10: null, q20: null,
            
            b11: null, b18: null,
            b12: null, b19: null,
            b13: null, b110: null,
            b14: null, b111: null,
            b15: null, b112: null,
            b16: null, b113: null,
            b17: null, 
            
            b21: null, b25: null,
            b22: null, b26: null,
            b23: null, b27: null,
            b24: null, b28: null,
            
            hqP: null,
            other: null
        }
    }

    //gets data from database
    getInfo = (id) => {
        axios.post('/home/prehlad_pacientov/info/get/pat/reports/data', {
            patient_id: id
        }).then((response) => {
            this.setState({
                q1: response.data[0].Q1,    q11: response.data[0].Q11, 
                q2: response.data[0].Q2,    q12: response.data[0].Q12,
                q3: response.data[0].Q3,    q13: response.data[0].Q13,
                q4: response.data[0].Q4,    q14: response.data[0].Q14,
                q5: response.data[0].Q5,    q15: response.data[0].Q15,
                q6: response.data[0].Q6,    q16: response.data[0].Q16,
                q7: response.data[0].Q7,    q17: response.data[0].Q17,
                q8: response.data[0].Q8,    q18: response.data[0].Q18,
                q9: response.data[0].Q9,    q19: response.data[0].Q19,
                q10: response.data[0].Q10,  q20: response.data[0].Q20,

                b11: response.data[0].B11,  b18: response.data[0].B18,
                b12: response.data[0].B12,  b19: response.data[0].B19,
                b13: response.data[0].B13,  b110: response.data[0].B110,
                b14: response.data[0].B14,  b111: response.data[0].B111,
                b15: response.data[0].B15,  b112: response.data[0].B112,
                b16: response.data[0].B16,  b113: response.data[0].B113,
                b17: response.data[0].B17,
                
                b21: response.data[0].B21,  b25: response.data[0].B25,
                b22: response.data[0].B22,  b26: response.data[0].B26,
                b23: response.data[0].B23,  b27: response.data[0].B27,
                b24: response.data[0].B24,  b28: response.data[0].B28,

                hqP: response.data[0].HQp,
                other: response.data[0].Other
            })
        })
    }

    //returns html text
    render(){
        return(
            <>
                <td><h8>{ this.props.data.date }</h8></td>
                <td>
                    <button type="button"
                            class="btn btn-outline-primary" 
                            data-bs-toggle="modal" 
                            data-bs-target={'#patReportInfo_' + this.props.data.id }
                            onClick={() => { this.getInfo(this.props.data.id) }}
                                >
                                    <BsSearch/> Info
                        </button>
                        <PatReportInfo reportID = {this.props.data.id} reportDate = {this.props.data.date} data = {this.state}/>
                </td>
            </>
        );
    }
}

export default PatientReport;
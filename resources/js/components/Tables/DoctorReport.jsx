/**
 * author: xhoril01
 * component: DoctorReport
 * view: Doctor view, Patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { BsSearch } from "react-icons/bs";
import DocReportInfo from '../Modals/DocReportInfo';

// Class component - this component is a row in table in doctor view, patient detail, doctor reports list
class DoctorReport extends Component{

    constructor(props){
        super(props);

        this.state = {
            ront: null,
            func: null,
            pain: null,
            swell: null,
            sediment: null,
            crp: null,
            vas: null,
            vasP: null,
            das: null
        }
    }

    //gets info from database
    getInfo = (id) => {
        axios.post('/home/prehlad_pacientov/info/get/doc/reports/data', {
            patient_id: id
        }).then((response) => {
            this.setState({
                ront: response.data[0].Ront,
                func: response.data[0].Func,
                pain: response.data[0].Pain,
                swell: response.data[0].Swell,
                sediment: response.data[0].Sediment,
                crp: response.data[0].CRP,
                vas: response.data[0].VAS,
                vasP: response.data[0].VASp,
                das: response.data[0].DAS
            })
        })
    }

    //returns html text
    render(){
        return(
            <>
                <td>{ this.props.data.date }</td>
                <td>
                    <button type="button"
                            class="btn btn-outline-primary" 
                            data-bs-toggle="modal" 
                            data-bs-target={'#docReportInfo_' + this.props.data.id }
                            onClick={() => { this.getInfo(this.props.data.id) }}
                                >
                                    <BsSearch/> Info
                        </button>
                        <DocReportInfo reportID = {this.props.data.id} reportDate = {this.props.data.date} data = {this.state}/>
                </td>
            </>
        );
    }
}

export default DoctorReport;
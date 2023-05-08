/**
 * author: xhoril01
 * component: DocReportInfo
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in doctor view, patient detail, modal used for ending treatment for patient
class EndPatient extends Component{

    constructor(props){
        super(props);
    }

    //end treatment for patient
    endPatient = () => {
        axios.post('/home/prehlad_pacientov/info/end/patient',{
            id: this.props.patient_id

        }).then(() => {
            toast.error("Pacient bol ukončený");
            
            setTimeout(() => {
                 location.replace('/home/prehlad_pacientov');
            }, 1500)
        })
    }

    //return html text
    render(){
        return(
            <div className="modal" id={'endPatient_' + this.props.patient_id } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ukončiť pacienta</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Naozaj chcete ukončiť pacienta?
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className='btn btn-danger'
                                    onClick={ this.endPatient }
                                    data-bs-dismiss="modal"
                            >
                                Áno
                            </button>
                            
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Nie</button>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}

export default EndPatient;
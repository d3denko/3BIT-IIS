/**
 * author: xhoril01
 * component: DrugClose
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in doctor view, patient detail, modal used for closing actively used medicine
class DrugClose extends Component{

    constructor(props){
        super(props);

        this.state = {
            reason: ""
        };
    }

    //change reason for close
    closeReason = (event) => {
        this.setState({reason: event.target.value});
    }

    //close the medicine
    closeDrug = () => {
        let self=this;
        axios.post('/home/prehlad_pacientov/info/close/drug', { 
            drugID: this.props.drugID,
            reason: this.state.reason
        }).then(() => {
            toast.error("Liek bol ukončený");
            
            self.props.handler();
        })
    }

    //return html text
    render(){
        return(
            <div className="modal" id={'drugClose_' + this.props.drugID } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ukončiť liek</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <p className='fs-5'> Naozaj chcete ukončiť liek? </p>
                            <form className='form'>
                                <div className='form-group fs-5'>
                                    <strong>Dôvod</strong><br/> 
                                    <input type="text"
                                           id="closeReason"
                                           className='form-control mb-3'
                                           value={ this.state.reason }
                                           onChange={ this.closeReason }
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button"
                                    className='btn btn-danger fs-5'
                                    onClick={ this.closeDrug }
                                    data-bs-dismiss="modal"
                            >
                                Áno
                            </button>
                            
                            <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Nie</button>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}

export default DrugClose;
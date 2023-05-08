/**
 * author: xhoril01
 * component: DocDelete
 * view: Doctor list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in doctor list, it's modal for used to confrim deletion of doctor
class DocDelete extends Component{

    constructor(props){
        super(props);
    }

    //delete selected doctor
    deleteDoc = () => {
        let self = this;
        axios.delete('/home/delete/doctor/' + this.props.docID).then(() => {
            toast.error("Údaje boli vymazané");
            self.props.handler();
            //setTimeout(() => {location.reload();}, 2500)
        })
    }

    //return html code
    render(){
        return(
            <div className="modal" id={'docDelete_' + this.props.docID } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Vymazať doktora</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Naozaj chcete vymazať záznam?
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className='btn btn-danger'
                                    onClick={ this.deleteDoc }
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

export default DocDelete;
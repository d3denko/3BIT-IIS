/**
 * author: xhoril01
 * component: CompDelete
 * view: Company list
 */


import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in company list, it's modal for used to confrim deletion of company
class CompDelete extends Component{

    constructor(props){
        super(props);
    }

    //Delete selected company and refresh
    deleteComp = () => {
        axios.post('/home/unbind/company/drugs', {
            id: this.props.compID
        });

        axios.delete('/home/delete/company/' + this.props.compID);

        axios.delete('/home/delete/user/' + this.props.userID).then((response) => {
            toast.error("Údaje boli vymazané");
            this.props.handler();
        });
    }

    //return html text
    render(){
        return(
            <div className="modal" id={'compDelete_' + this.props.compID } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Vymazať firmu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Naozaj chcete vymazať záznam?
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className='btn btn-danger'
                                    onClick={ this.deleteComp }
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

export default CompDelete;
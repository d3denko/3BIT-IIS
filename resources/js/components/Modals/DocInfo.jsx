/**
 * author: xhoril01
 * component: DocInfo
 * view: Doctor list
 */

import React,{ Component } from 'react';

// Class component - this component is used in doctor list, this modal shows detailed view of doctor
class DocInfo extends Component{

    constructor(props){
        super(props);
    }

    //return html code
    render(){
        return(
            <div className="modal" id={'docInfo_' + this.props.docID } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Informácie o doktorovi</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Meno: <strong> { this.props.data.docName } </strong> <br/>
                        Priezvisko: <strong> { this.props.data.docLast } </strong> <br/>
                        Email: <strong> { this.props.data.docMail } </strong>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zavrieť</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DocInfo;
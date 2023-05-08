/**
 * author: xhoril01
 * component: CompInfo
 * view: Company list
 */


import React,{ Component } from 'react';

// Class component - this component is used in company list, this modal shows detailed view of company
class CompInfo extends Component{

    constructor(props){
        super(props);
    }

    //returns html text
    render(){
        return(
            <div class="modal" id={ "compInfo_" + this.props.compID } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Informácie o firme</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        Názov: <strong> { this.props.data.compName } </strong> <br/>
                        Popis: <strong> { this.props.data.compDesc } </strong> <br/>
                        Email: <strong> { this.props.data.compMail } </strong> <br/>
                        Kontakt: <strong> { this.props.data.compPhone } </strong> <br/>
                        Adresa: <strong> { this.props.data.compAddr } </strong> <br/>
                        <br/><h5><strong> Prihlasovacie údaje </strong></h5> <br/>
                        Meno: <strong> { this.props.data.userName } </strong> <br/>
                        Priezvisko: <strong> { this.props.data.userLast } </strong> <br/>
                        Email: <strong> { this.props.data.userMail } </strong>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zavrieť</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompInfo;
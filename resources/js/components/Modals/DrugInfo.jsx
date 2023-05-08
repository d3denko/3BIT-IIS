/**
 * author: xhoril01
 * component: DrugInfo
 * view: Medicine list
 */

import axios from 'axios';
import React,{ Component } from 'react';

// Class component - this component is used in medicine list, this modal shows detailed view of medicine
class DrugInfo extends Component{

    constructor(props){
        super(props);
    }

    //return html text
    render(){
        return(
            <div class="modal" id={ "drugInfo_" + this.props.drugID } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Informácie o lieku</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        Názov lieku: <strong> { this.props.data.drugName } </strong> <br/>
                        Verzia lieku: <strong> { this.props.data.drugVers } </strong> <br/>
                        Typ lieku: <strong> { this.props.data.drugType } </strong> <br/>
                        Spoločnosť: <strong> { this.props.data.compName } </strong> <br/>
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

export default DrugInfo;
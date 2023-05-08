/**
 * author: xhoril01
 * component: DocReportInfo
 * view: Doctor view - patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';

// Class component - this component is used in doctor viewv, patient detail, this modal shows detailed view of one doctor report of patient
class DocReportInfo extends Component{

    constructor(props){
        super(props);
    }

    //return html text
    render(){
        return(
            <div class="modal" id={ "docReportInfo_" + this.props.reportID } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Hlásenie '{this.props.reportDate}'</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className='row'>
                            <div className='col-md-6'>
                                <h6><strong>Ront: </strong>{ this.props.data.ront }</h6> <br/>
                                <h6><strong>Func: </strong>{ this.props.data.func }</h6> <br/>
                                <h6><strong>Bolesť: </strong>{ this.props.data.pain }</h6> <br/>
                                <h6><strong>Opuch: </strong>{ this.props.data.swell }</h6> <br/>
                                <h6><strong>Sediment: </strong>{ this.props.data.sediment }</h6> <br/>
                            </div>

                            <div className='col-md-6'>
                                <h6><strong>CRP: </strong>{ this.props.data.crp }</h6> <br/>
                                <h6><strong>VAS: </strong>{ this.props.data.vas }</h6> <br/>
                                <h6><strong>VASp: </strong>{ this.props.data.vasP }</h6> <br/>
                                <h6><strong>DAS: </strong>{ this.props.data.das }</h6> <br/>
                            </div>
                        </div>
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

export default DocReportInfo;
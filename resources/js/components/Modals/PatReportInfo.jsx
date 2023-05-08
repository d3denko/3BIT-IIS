/**
 * author: xhoril01
 * component: PatReportInfo
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';

// Class component - this component is used in doctor view, patient detail, modal used for getting doctor report information
class PatReportInfo extends Component{

    constructor(props){
        super(props);
    }

    //return html text
    render(){
        return(
            <div class="modal" id={ "patReportInfo_" + this.props.reportID } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Hlásenie '{this.props.reportDate}'</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className='row'>
                            <div className='col-md-3'>
                                <h6><strong>Q1: </strong>{ this.props.data.q1 }</h6> <br/>
                                <h6><strong>Q2: </strong>{ this.props.data.q2 }</h6> <br/>
                                <h6><strong>Q3: </strong>{ this.props.data.q3 }</h6> <br/>
                                <h6><strong>Q4: </strong>{ this.props.data.q4 }</h6> <br/>
                                <h6><strong>Q5: </strong>{ this.props.data.q5 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>Q6: </strong>{ this.props.data.q6 }</h6> <br/>
                                <h6><strong>Q7: </strong>{ this.props.data.q7 }</h6> <br/>
                                <h6><strong>Q8: </strong>{ this.props.data.q8 }</h6> <br/>
                                <h6><strong>Q9: </strong>{ this.props.data.q9 }</h6> <br/>
                                <h6><strong>Q10: </strong>{ this.props.data.q10 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>Q11: </strong>{ this.props.data.q11 }</h6> <br/>
                                <h6><strong>Q12: </strong>{ this.props.data.q12 }</h6> <br/>
                                <h6><strong>Q13: </strong>{ this.props.data.q13 }</h6> <br/>
                                <h6><strong>Q14: </strong>{ this.props.data.q14 }</h6> <br/>
                                <h6><strong>Q15: </strong>{ this.props.data.q15 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>Q16: </strong>{ this.props.data.q16 }</h6> <br/>
                                <h6><strong>Q17: </strong>{ this.props.data.q17 }</h6> <br/>
                                <h6><strong>Q18: </strong>{ this.props.data.q18 }</h6> <br/>
                                <h6><strong>Q19: </strong>{ this.props.data.q19 }</h6> <br/>
                                <h6><strong>Q20: </strong>{ this.props.data.q20 }</h6> <br/>
                            </div>
                        </div>

                        <div><br/></div>

                        <div className='row'>
                            <div className='col-md-3'>
                                <h6><strong>B11: </strong>{ this.props.data.b11 }</h6> <br/>
                                <h6><strong>B12: </strong>{ this.props.data.b12 }</h6> <br/>
                                <h6><strong>B13: </strong>{ this.props.data.b13 }</h6> <br/>
                                <h6><strong>B14: </strong>{ this.props.data.b14 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>B15: </strong>{ this.props.data.b15 }</h6> <br/>
                                <h6><strong>B16: </strong>{ this.props.data.b16 }</h6> <br/>
                                <h6><strong>B17: </strong>{ this.props.data.b17 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>B18: </strong>{ this.props.data.b18 }</h6> <br/>
                                <h6><strong>B19: </strong>{ this.props.data.b19 }</h6> <br/>
                                <h6><strong>B110: </strong>{ this.props.data.b110 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>B111: </strong>{ this.props.data.b111 }</h6> <br/>
                                <h6><strong>B112: </strong>{ this.props.data.b112 }</h6> <br/>
                                <h6><strong>B113: </strong>{ this.props.data.b113 }</h6> <br/>
                            </div>
                        </div>

                        <div><br/></div>

                        <div className='row'>
                            <div className='col-md-3'>
                                <h6><strong>B21: </strong>{ this.props.data.b21 }</h6> <br/>
                                <h6><strong>B22: </strong>{ this.props.data.b22 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>B23: </strong>{ this.props.data.b23 }</h6> <br/>
                                <h6><strong>B24: </strong>{ this.props.data.b24 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>B25: </strong>{ this.props.data.b25 }</h6> <br/>
                                <h6><strong>B26: </strong>{ this.props.data.b26 }</h6> <br/>
                            </div>

                            <div className='col-md-3'>
                                <h6><strong>B27: </strong>{ this.props.data.b27 }</h6> <br/>
                                <h6><strong>B28: </strong>{ this.props.data.b28 }</h6> <br/>
                            </div>
                        </div>
                        
                        <div><br/></div>

                        <div>
                            <h6><strong>HQp: </strong>{ this.props.data.hqP }</h6> <br/>
                            <h6><strong>Other: </strong>{ this.props.data.other }</h6> <br/>
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

export default PatReportInfo;
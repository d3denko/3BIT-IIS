/**
 * author: xhoril01
 * component: DocReportInfo
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';

// Class component - this component is used in doctor view, patient detail, modal used for getting detail about prescribed medicine
class DrugUse extends Component{

    constructor(props){
        super(props);

        this.state = {
            drugName: null,
            drugComp_ID: null,
            compName: null
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    //get information about medicines
    getInfo = () => {
        axios.post('/home/get/drug/details', {
            drugID: this.props.drugID
        }).then((response) => {
            this.setState({
                drugName: response.data.name,
                drugComp_ID: response.company_id,
            })
        });

        axios.post('/home/get/comp/name', {
            drugID: this.props.drugID
        }).then((response) => {
            this.setState({
                compName: response.data
            });
        });
    }

    //set dosage form int to string
    dosage() {
        switch(this.props.dosagePeriod){

            case 1: return( <p style={{ marginBottom: 0 }}> { this.props.dosageTime }x/deň</p>); break;

            case 2: return( <p style={{ marginBottom: 0 }}> { this.props.dosageTime }x/týždeň</p>); break;

            case 3: return( <p style={{ marginBottom: 0 }}> { this.props.dosageTime }x/mesiac</p>); break;

            case 4: return( <p style={{ marginBottom: 0 }}> { this.props.dosageTime }x/3 mesiace</p>); break;

            case 5: return( <p style={{ marginBottom: 0 }}> { this.props.dosageTime }x/6 mesiacov</p>); break;

            default: return(<p></p>)
        }
    }

    //return html code
    render(){
        return(
            <div class="modal" id={ "drugUse_" + this.props.drugID } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Informácie o lieku</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body fs-5">
                            <div>
                                <strong>Názov lieku:</strong> { this.state.drugName } <br/>
                                <strong>Spoločnosť:</strong>  { this.state.compName } <br/>
                            </div>

                            <div><br/></div>

                            <div className='fs-5'>
                                <strong>Užívanie:</strong> { this.dosage() }
                                <strong>Užívať od:</strong> { this.props.from } <br/>
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

export default DrugUse;
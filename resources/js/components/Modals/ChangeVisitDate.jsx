/**
 * author: xhoril01
 * component: ChangeVisitDate
 * view: PatientInfo - modal
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in patient info, it is pop up modal window, used for changeing next patient visit
class changeVisitDate extends Component{

    constructor(props){
        super(props);

        this.state = {
            date: null
        }
    }

    //Change date selected date
    dateChange = (event) => {
        this.setState({ date: event.target.value });
    }

    //Sets selected date
    changeVisitDate = () => {
        let self=this;
        if(this.state.date == null) this.setState({date: this.props.date})

        axios.post('/home/prehlad_pacientov/info/change/visit/date', { 
            patient_id: this.props.patient_id,
            date: this.state.date
            
        }).then(() => {
            toast.success("Dátum kontroly bol zmenený");
            self.props.handler();
        })
    }

    //Returns html text
    render(){
        return(
                <div className="modal" id={'changeVisitDate_' + this.props.patient_id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Zmeniť dátum kontroly</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div className="modal-body position-relative">
                                <form>
                                    <div class="form-group">
                                        <input type="date" 
                                               class="form-control form-control-lg" 
                                               aria-describedby="dateChange" 
                                               onChange={this.dateChange}
                                                />
                                    </div>
                                    
                                </form>
                            </div>

                            <div className='modal-footer'>
                                <div className='col-md-2'>
                                    <button type="submit"
                                            className='btn btn-info fs-5'
                                            data-bs-dismiss="modal"
                                            onClick={this.changeVisitDate}
                                            >
                                                Zmeniť
                                    </button>
                                </div>

                                <div className='col-md-2'>
                                    <button type="button" 
                                            className="btn btn-secondary fs-5"  
                                            data-bs-dismiss="modal"
                                            >
                                                Zatvoriť
                                    </button>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default changeVisitDate;
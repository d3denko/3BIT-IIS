/**
 * author: xhoril01
 * component: DocReportInfo
 * view: Doctor view, patient detail
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCheckCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";

// Class component - this component is used in doctor view, patient detail, modal used for making a new report about patient
class NewDocReport extends Component{

    constructor(props){
        super(props);

        this.state = {
            ront: 0,
            func: 0,
            pain: 0,
            swell: 0,
            sedi: 0,
            crp: 0,
            vas: 0,
            vasP: 0,
            das: 0,

            rontValid: false,
            funcValid: false,
            painValid: false,
            swellValid: false,
            sediValid: false,
            vasValid: false,
            vasPValid: false,
            crpValid: false,
            dasValid: false,

           errors: []

        }
    }

    //check data and add new doctor report
    newDocReport = () => {
        //this.validateInput;

        axios.post('/home/prehlad_pacientov/info/new/doc/report', { 
            ront: this.state.ront,
            func: this.state.func,
            pain: this.state.pain,
            swell: this.state.swell,
            sedi: this.state.sedi,
            crp: this.state.crp,
            vas: this.state.vas,
            vasP: this.state.vasP,
            das: this.state.das,
            patient_id: this.props.patient_id

        }).then(() => {
            toast.success("Hlásenie bolo pridané");

            this.props.handler();
        })
    }

    //change ront number
    rontChange = (event) =>{
        this.setState({
            ront: event.target.value
        });
    }

    //change func number
    funcChange = (event) =>{
        this.setState({
            func: event.target.value
        });
    }

    //change pain koef
    painChange = (event) =>{
        this.setState({
            pain: event.target.value
        });
    }

    //change swell koef
    swellChange = (event) =>{
        this.setState({
            swell: event.target.value
        });
    }

    //change sediment koef
    sediChange = (event) =>{
        this.setState({
            sedi: event.target.value
        });
    }

    //change DAS value
    vasChange = (event) =>{
        this.setState({
            vas: event.target.value
        });
    }

    //change DAS patient value
    vasPChange = (event) =>{
        this.setState({
            vasP: event.target.value
        });
    }

    //change crp koef
    crpChange = (event) =>{
        this.setState({
            crp: event.target.value
        });
    }

    //change vas val
    dasChange = (event) =>{
        this.setState({
            das: event.target.value
        });
    }


    //validate input
    validateInput = () => {

        Object.entries(this.state).map(  ([infoName,value]) => {

            if(infoName == 'ront')
                if(value >= 0 && value <= 4) {
                    this.setState({rontValid: true});
                }
                else {
                    this.state.errors.push("Nevalidný vstup - Rönt");
                }
        
            else if(infoName == 'func')
                    if(value >= 0 && value <= 4){
                        this.setState({funcValid: true});
                    }
                    else {
                        this.state.errors.push("Nevalidný vstup - Funk");
                    }
            
            else if(infoName == 'pain')
                    if(Number.isInteger(value) && value >= 0 && value <= 28) {
                        this.setState({painValid: true});
                    }
                    else {
                        this.state.errors.push("Nevalidný vstup - Bolesť (rozsah 0-28) ");
                    }
            
            else if(infoName == 'swell')
                    if(Number.isInteger(value) && value >= 0 && value <= 28) {
                        this.setState({swellValid: true});
                    }
                    else {
                        this.state.errors.push("Nevalidný vstup - Opuch (rozsah 0-28) ");
                    }

            else if(infoName == 'sedi')
                    if(Number.isInteger(value) && value >= 0 && value <= 100) {
                        this.setState({sediValid: true});
                    }
                    else {
                        this.state.errors.push("Nevalidný vstup - Sediment (rozsah 0-100) ");
                    }
            
            else if(infoName == 'vas')
                    if(Number.isInteger(value) && value >= 0 && value <= 100) {
                        this.setState({vasValid: true});
                    }
                    else {
                        this.state.errors.push("Nevalidný vstup - VAS (rozsah 0-100) ");
                    }
            
            else if(infoName == 'vasP')
                    if(Number.isInteger(value) && value >= 0 && value <= 100) {
                        this.setState({vasPValid: true});
                    }
                    else {
                        this.state.errors.push("Nevalidný vstup - VAsp (rozsah 0-100) ");
                    }
        
            else if(infoName == 'crp')
                if(value >= 0 && value <= 100) {
                    this.setState({crpValid: true});
                }
                else {
                    this.state.errors.push("Nevalidný vstup - CRP (rozsah 0-100) ");
                }
            
            else if(infoName == 'das')
                    if(value >= 0 && value <= 100) {
                        this.setState({dasValid: true});
                    }
                    else {
                        this.state.errors.push("Nevalidný vstup - DAS (rozsah 0-100) ");
                    }
        });
        

        return;
    }

    //message error
    errorMsg = () => {
        this.state.errors.map(msg => toast.error(msg));
    }

    //return html text
    render(){
        return(
            <>
                <button type='button' 
                    className='btn btn-primary fs-5' 
                    style={{ padding: 12 }}
                    data-bs-toggle='modal'
                    data-bs-target={'#newDocReport'}>
                                                
                        Pridať hlásenie
                </button>
                
                
                <div className="modal" id='newDocReport' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pridať hlásenie</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body position-relative">
                                <form class="needs-validation" novalidate 
                                      >
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <label htmlFor="ront">Rönt.poš.</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.rontChange} required>
                                                <option selected disabled> Zvoľte koef. rönt. poškodenia</option>

                                                <option value="0">0</option>    
                                                <option value="1">1</option>    
                                                <option value="2">2</option>
                                                <option value="3">3</option> 
                                                <option value="4">4</option>    

                                            </select>
                                        </div>

                                        <div className='col-md-3'>
                                            <label htmlFor="func">Funk.poš.</label>
                                            <select className="form-select" aria-label="Func select" onChange={this.funcChange} required>
                                                <option selected disabled> Zvoľte koef. funk. poškodenia</option>

                                                <option value="0">0</option>    
                                                <option value="1">1</option>    
                                                <option value="2">2</option>    
                                                <option value="3">3</option>
                                                <option value="4">4</option>      

                                            </select>
                                        </div>

                                        <div className='col-md-3 mb-3'>
                                            <label htmlFor="pain">Bolesť</label>
                                            <input type="number" required className="form-control" min='0' max='28' name="pain"
                                                placeholder="Bolesť" id='pain'
                                                value={this.state.pain}
                                                onChange={this.painChange}  />
                                            <div class="valid-tooltip">
                                                <BsCheckCircle/>
                                            </div>
                                            <div class="invalid-tooltip">
                                                <BsXCircle/>
                                            </div>
                                        </div>

                                        <div className='col-md-3 mb-3'>
                                            <label htmlFor="pain">Opuch</label>
                                            <input type="number" required className="form-control" name="swell" min='0' max='28'
                                                placeholder="Opuch"
                                                value={this.state.swell}
                                                onChange={this.swellChange}  />
                                            
                                            <div class="valid-tooltip">
                                                <BsCheckCircle/>
                                            </div>
                                            <div class="invalid-tooltip">
                                                <BsXCircle/>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-3 mb-3'>
                                            <label htmlFor="sedi">Sediment</label>
                                            <input type="number" required className="form-control" name="sedi" min='0' max='100'
                                                placeholder="Sediment"
                                                value={this.state.sedi}
                                                onChange={this.sediChange}  />
                                                
                                            <div class="valid-tooltip">
                                                <BsCheckCircle/>
                                            </div>
                                            <div class="invalid-tooltip">
                                                <BsXCircle/>
                                            </div>
                                        </div>

                                        <div className='col-md-3 mb-3'>
                                            <label htmlFor="vas">VAS</label>
                                            <input type="number" required className="form-control" name="vas"  min='0' max='100'
                                                placeholder="VAS"
                                                value={this.state.vas}
                                                onChange={this.vasChange}  />
                                            
                                            <div class="valid-tooltip">
                                                <BsCheckCircle/>
                                            </div>
                                            <div class="invalid-tooltip">
                                                <BsXCircle/>
                                            </div>
                                        </div>

                                        <div className='col-md-3 mb-3'>
                                            <label htmlFor="vasP">VAS pacienta</label>
                                            <input type="number" required className="form-control" name="vasP"  min='0' max='100'
                                                placeholder="VAS pacienta"
                                                value={this.state.vasP}
                                                onChange={this.vasPChange}  />
                                            
                                            <div class="valid-tooltip">
                                                <BsCheckCircle/>
                                            </div>
                                            <div class="invalid-tooltip">
                                                <BsXCircle/>
                                            </div>
                                        </div>

                                        <div className='col-md-3 mb-3'>
                                            <label htmlFor="crp">CRP</label>
                                            <input type="text" required className="form-control" name="crp"
                                                placeholder="CRP"
                                                value={this.state.crp}
                                                onChange={this.crpChange}  />
                                            
                                            <div class="valid-tooltip">
                                                <BsCheckCircle/>
                                            </div>
                                            <div class="invalid-tooltip">
                                                <BsXCircle/>
                                            </div>
                                        </div>
                                        

                                        <div className='col-md-3 mb-3'>
                                            <label htmlFor="das">DAS</label>
                                            <input type="text" required className="form-control" name="das"
                                                placeholder="DAS"
                                                value={this.state.das}
                                                onChange={this.dasChange}  />

                                            <div class="valid-tooltip">
                                                <BsCheckCircle/>
                                            </div>
                                            <div class="invalid-tooltip">
                                                <BsXCircle/>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='row justify-content-around'>
                                        <div className='col-md-2'>
                                            <button type="button"
                                                className='btn btn-info fs-5'
                                                data-bs-dismiss="modal"
                                                onClick={ this.newDocReport }
                                                //disabled={ this.state.errors.length === 0 ? false : true }
                                                >
                                                    Pridať
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

                                        <div className='col-md-3'>
                                            <button type="button"
                                                className='btn btn-outline-danger fs-5'
                                                data-bs-dismiss="modal"
                                                //disabled={ this.state.errors.length === 0 ? true : false }
                                                //onClick={this.errorMsg}
                                                >
                                                    Zobraziť chyby
                                            </button>
                                        </div>

                                    </div>
                                    
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewDocReport;
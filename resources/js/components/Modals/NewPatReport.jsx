/**
 * author: xhoril01
 * component: NewpatReport
 * view: Patient view
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in patient view, modal used for making a new HQC report
class NewPatReport extends Component{

    constructor(props){
        super(props);

        this.state = {
            q1: '0', q11: '0', 
            q2: '0', q12: '0',
            q3: '0', q13: '0',
            q4: '0', q14: '0',
            q5: '0', q15: '0',
            q6: '0', q16: '0',
            q7: '0', q17: '0',
            q8: '0', q18: '0',
            q9: '0', q19: '0',
            q10: '0', q20: '0',
            
            b11: '0', b18: '0',
            b12: '0', b19: '0',
            b13: '0', b110: '0',
            b14: '0', b111: '0',
            b15: '0', b112: '0',
            b16: '0', b113: '0',
            b17: '0', 
            
            b21: '0', b25: '0',
            b22: '0', b26: '0',
            b23: '0', b27: '0',
            b24: '0', b28: '0',
        
            other: ""
        }
    }

    //compute HQP
    computeHQp = () => {
        let sum = 0;
        for (const [key, value] of Object.entries(this.state)) {
            if(key != 'other') sum += value;
          }

        let avg = (sum / (this.state.length - 1)) *10;

        return avg;
    }

    //Create new patient report
    NewPatReport = () => {
        if(this.state.other !== "") this.setState({b113: '1'});
        let hqP = this.computeHQp();

        axios.post('/home/moja_liecba/new/pat/report', { 
            q1: this.state.q1,    q11: this.state.q11, 
            q2: this.state.q2,    q12: this.state.q12,
            q3: this.state.q3,    q13: this.state.q13,
            q4: this.state.q4,    q14: this.state.q14,
            q5: this.state.q5,    q15: this.state.q15,
            q6: this.state.q6,    q16: this.state.q16,
            q7: this.state.q7,    q17: this.state.q17,
            q8: this.state.q8,    q18: this.state.q18,
            q9: this.state.q9,    q19: this.state.q19,
            q10: this.state.q10,  q20: this.state.q20,

            b11: this.state.b11,  b18: this.state.b18,
            b12: this.state.b12,  b19: this.state.b19,
            b13: this.state.b13,  b110: this.state.b110,
            b14: this.state.b14,  b111: this.state.b111,
            b15: this.state.b15,  b112: this.state.b112,
            b16: this.state.b16,  b113: this.state.b113,
            b17: this.state.b17,
                
            b21: this.state.b21,  b25: this.state.b25,
            b22: this.state.b22,  b26: this.state.b26,
            b23: this.state.b23,  b27: this.state.b27,
            b24: this.state.b24,  b28: this.state.b28,

            other: this.state.other,
            hqP: hqP,
            patient_id: this.props.patient_id

        }).then(() => {
            toast.success("Hlásenie bolo pridané");
        })
    }
    
    //change values
    eventHandler = (event) => {
        const infoName = event.target.name;
        const value = event.target.value;

        this.setState({
            [infoName]: value});
    }

    //return html code
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
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Pridať hlásenie</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body position-relative">
                                <h5><strong> 1. Prosíme zvolľte jednu z možostí v každom riadku, ktorá najlepšie vystihuje Vaše schopnosti v minulom týždni: </strong></h5>
                                
                                <form>
                                    <div className='row '>
                                        <div><br/></div>
                                        <h6><strong>Obliekanie a upravovanie sa</strong></h6>
                                       
                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný obliecť sa, uviazať si šnúrky, zapnúť gombíky?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q1' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný umyť si vlasy šampónom?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q2' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div><br/></div>

                                        <h6><strong>Vstávanie</strong></h6>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný vstať z klasickej stoličky, ktorá nemá operadlá?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q3' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný ľahnúť si do postele a vstať z nej?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q4' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                    </div>

                                    <div className='row '>
                                        <div><br/></div>

                                        <h6><strong>Jedenie</strong></h6>
                                        
                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný pokrájať si mäso?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q5' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný zdvihnúť plnú šálku alebo pohár k Vašim ústam?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q6' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                        
                                        <div className='col-md-auto'>
                                            <label htmlFor="ront" style={{ marginTop:10 }}>Ste schopný otvoriť novú krabicu mlieka alebo pracieho prášku?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q7' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                    </div>

                                    <div className='row '>

                                        <div><br/></div>

                                        <h6><strong>Chôdza</strong></h6>
                                        
                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný prechádzať sa vonku po rovine?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q8' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný vystúpiť 5 schodov?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q9' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                    </div>        
                                </form>

                                <div><br/></div>

                                <h5><strong>2. Prosíme označte križikom všetky pomôcky alebo zariadenia, ktoré obvykle používate na vyššie uvedené aktivity: </strong></h5>
                                <div className='row text-grey'>
                                    <div className='col-md-4 d-flex flex-column'>
                                        <div className="form-check" >
                                            <input class="form-check-input" type="checkbox" value="1" id="stick" onChange={this.eventHandler} name='b11'/>
                                            <label class="form-check-label" for="stick"> Vychádzková palička </label>
                                        </div>

                                        <div class="form-check col-md-auto">
                                            <input class="form-check-input" type="checkbox" value="1" id="walker" onChange={this.eventHandler} name='b12'/>
                                            <label class="form-check-label" for="walker"> Chodítko, presuvný rám </label>
                                        </div>

                                        <div class="form-check col-md-auto">
                                            <input class="form-check-input" type="checkbox" value="1" id="tools" onChange={this.eventHandler} name='b13'/>
                                            <label class="form-check-label" for="tools"> Upravené alebo špeciálne náradie </label>
                                        </div>

                                        <div class="form-check col-md-auto">
                                            <input class="form-check-input" type="checkbox" value="1" id="chair" onChange={this.eventHandler} name='b14'/>
                                            <label class="form-check-label" for="chair"> Upravené alebo špeciálne kreslo </label>
                                        </div>
                                    </div>

                                    <div className='col-md-4 d-flex flex-column'>

                                        <div class="form-check col-md-auto">
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b15'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Pomôcky na obliekanie (háčik na gombíky, ťahadlo na zips, dlhý obuvák ) </label>
                                        </div>

                                        <div class="form-check col-md-auto">
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b16'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Barle </label>
                                        </div>

                                        <div class="form-check col-md-auto">
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b17'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Kolesový vozík</label>
                                        </div>
                                    </div>
                                </div>

                                <div><br/></div>

                                <h5><strong>3. Prosíme označte krížikom oblasti, v ktorých obvykle potrebujete pomoc druhej osoby:</strong></h5>

                                <div className='row '>
                                    <div className="form-check col-md-3" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b21'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Obliekanie a upravovanie </label>
                                    </div>

                                    <div className="form-check col-md-3" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b22'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Vstávanie </label>
                                    </div>

                                    <div className="form-check col-md-3" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b23'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Jedenie </label>
                                    </div>

                                    <div className="form-check col-md-3" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b24'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Chôdza </label>
                                    </div>
                                </div>

                                <div><br/></div>

                                <h5><strong>4. Prosíme, zakrúžkujte jednu odpoveď v každom riadku, ktorá najlepšie vystihuje Vaše schopnosti v minulom týždni: </strong></h5>
                                <form>
                                    <div className='row '>
                                        <div><br/></div>
                                        <h6><strong>Hygiena</strong></h6>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný umyť sa a osušiť celé Vaše telo?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q10' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný sa okúpať vo vani?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q11' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront" style={{ marginTop: 10 }}>Ste schopný posadiť sa na záchodovú misu a vstať z nej?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q12' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div><br/></div>
                                        <h6><strong>Dosah</strong></h6>
                                        
                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný dosiahnuť 2-3kg predmet,napr. vrecko zemiakov z výšky tesne nad Vašou hlavou?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q13' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront" style={{ marginTop: 10 }}>Ste schopný zohnúť sa dolu,aby ste zdvihli oblečenie zo zeme?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q14' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div><br/></div>
                                        <h6><strong>Stisk</strong></h6>
                                        
                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný otvoriť dvere auta?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q15' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný otvoriť zavárací pohár, ktorý už bol pred tým otvorený?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q16' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront" style={{ marginTop: 10 }}>Ste schopný otvoriť a zatvoriť vodovodný kohútik?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q17' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div><br/></div>
                                        <h6><strong>Aktivita</strong></h6>
                                        
                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný vybavovať praktické záležitosti a nakupovať?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q18' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront">Ste schopný nasadnúť do auta a vystúpiť z neho?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q19' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>

                                        <div className='col-md-auto'>
                                            <label htmlFor="ront" style={{ marginTop: 10 }}>Ste schopný vysávať, robiť domáce práce a ľahkú prácu v záhrade?</label>
                                            <select className="form-select" aria-label="Ront select" onChange={this.eventHandler} name='q20' required>

                                                <option selected value="0">Bez akýchkoľvek problémov</option>    
                                                <option value="1">S menšími problémami</option>    
                                                <option value="2">S veľkými problémami</option>
                                                <option value="3">Som úplne nechopná/ý</option>   

                                            </select>
                                        </div>
                                    </div>        
                                </form>

                                <div><br/></div>

                                <h5><strong>5. Prosíme označte krížikom všetky pomôcky a zariadenia, ktoré obvykle používate pre vyššie uvedené aktivity: </strong></h5>
                                <div className='row '>
                                    <div className='col-md-4 d-flex flex-column'>
                                        <div className="form-check col-md-auto" >
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b18'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Zvýšená sedačka na záchodovej mise </label>
                                        </div>

                                        <div className="form-check col-md-auto" >
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b19'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Sedačka vo vani </label>
                                        </div>

                                        <div className="form-check col-md-auto" >
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b110'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Otvárač zaváracích pohárov (pri otváraní už pred tým otvorených) </label>
                                        </div>
                                    </div>
                                    
                                    <div className='col-md-4 d-flex flex-column'>
                                        <div className="form-check col-md-auto" >
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b111'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Držadlo vo vani </label>
                                        </div>

                                        <div className="form-check col-md-auto" >
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b112'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Náradie s dlhou rúčkou umožňujúce dosahovanie predmetov </label>
                                        </div>

                                        <div className="form-check col-md-auto" >
                                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b113'/>
                                            <label class="form-check-label" for="flexCheckDefault"> Iné (uveďte prosím) </label>
                                            <input class="form-control" type="text" placeholder='Iné' onChange={this.eventHandler} name='other'/>
                                        </div>
                                    </div>    
                                </div>

                                <div><br/></div>

                                <h5><strong>6. Prosíme označte krížikom oblasti, v ktorých obvykle potrebujete pomoc inej osoby:</strong></h5>
                                <div className='row '>
                                    <div className="form-check col-md-3" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b25'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Hygiena </label>
                                    </div>

                                    <div className="form-check col-md-3" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b26'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Dosahovanie predmetov </label>
                                    </div>

                                    <div className="form-check col-md-auto" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b27'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Uchopenie a otváranie vecí </label>
                                    </div>

                                    <div className="form-check col-md-auto" >
                                        <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={this.eventHandler} name='b28'/>
                                        <label class="form-check-label" for="flexCheckDefault"> Domáce práce a vybavovanie praktických záležitostí </label>
                                    </div>
                                </div>
                            </div>

                            <div className='modal-footer'>
                                <div className='col-md-2'>
                                    <button type="submit"
                                            className='btn btn-info fs-5'
                                            data-bs-dismiss="modal"
                                            onClick={ this.NewPatReport }
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
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewPatReport;
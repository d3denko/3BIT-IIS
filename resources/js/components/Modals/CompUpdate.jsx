/**
 * author: xhoril01
 * component: CompUpdate
 * view: Company list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in company list, this modal is used to update saved company
class CompUpdate extends Component{

    constructor(props){
        super(props);

        this.state = {
            compName: "",
            compAddr: "",
            compPhone: "",
            compMail: "",
            compDesc: "",
            userName: "",
            userLast: "",
            userMail: ""
        }
    }

    //change name of company
    compNameChange = (event) =>{
        this.setState({
            compName: event.target.value
        });
    }

    //change address of company
    compAddrChange = (event) =>{
        this.setState({
            compAddr: event.target.value
        });
    }

    //change phone of company
    compPhoneChange = (event) =>{
        this.setState({
            compPhone: event.target.value
        });
    }

    //change mail of company
    compMailChange = (event) =>{
        this.setState({
            compMail: event.target.value
        });
    }

    //change description of company
    compDescChange = (event) =>{
        this.setState({
            compDesc: event.target.value
        });
    }

    //change name of company user
    userNameChange = (event) =>{
        this.setState({
            userName: event.target.value
        });
    }

    //change last name of company user
    userLastChange = (event) =>{
        this.setState({
            userLast: event.target.value
        });
    }

    //change mail of company user
    userMailChange = (event) =>{
        this.setState({
            userMail: event.target.value
        });
    }

    //set current information of company
    static getDerivedStateFromProps(props, current_state){
        let compUpdate = {
            compName: null,
            compAddr: null,
            compPhone: null,
            compMail: null,
            compDesc: null,
            userName: null,
            userLast: null,
            userMail: null
        };

        // Update from input
        if(current_state.compName && (current_state.compName !== props.data.compName)) return null;
        if(current_state.compAddr && (current_state.compAddr !== props.data.compAddr)) return null;
        if(current_state.compPhone && (current_state.compPhone !== props.data.compPhone)) return null;
        if(current_state.compMail && (current_state.compMail !== props.data.compMail)) return null;
        if(current_state.compDesc && (current_state.compDesc !== props.data.compDesc)) return null;
        if(current_state.userName && (current_state.userName !== props.data.userName)) return null;
        if(current_state.userLast && (current_state.userLast !== props.data.userLast)) return null;
        if(current_state.userMail && (current_state.compAddr !== props.data.userMail)) return null;


        // Update from props
        if( current_state.compName !== props.data.compName || current_state.compName === props.data.compName ){
            compUpdate.compName = props.data.compName;
        }

        if( current_state.compAddr !== props.data.compAddr || current_state.compAddr === props.data.compAddr ){
            compUpdate.compAddr = props.data.compAddr;
        }

        if( current_state.compPhone !== props.data.compPhone || current_state.compPhone === props.data.compPhone ){
            compUpdate.compPhone = props.data.compPhone;
        }

        if( current_state.compMail !== props.data.compMail || current_state.compMail === props.data.compMail ){
            compUpdate.compMail = props.data.compMail;
        }

        if( current_state.compDesc !== props.data.compDesc || current_state.compDesc === props.data.compDesc ){
            compUpdate.compDesc = props.data.compDesc;
        }

        if( current_state.userName !== props.data.userName || current_state.userName === props.data.userName ){
            compUpdate.userName = props.data.userName;
        }

        if( current_state.userLast !== props.data.userLast || current_state.userLast === props.data.userLast ){
            compUpdate.userLast = props.data.userLast;
        }

        if( current_state.userMail !== props.data.userMail || current_state.userMail === props.data.userMail ){
            compUpdate.userMail = props.data.userMail;
        }

        return compUpdate;
    }

    //set changes
    updateComp = () =>{
        axios.post('/home/update/comp/user',{
            compID: this.props.compID, 
            userName: this.state.userName,
            userLast: this.state.userLast,
            userMail: this.state.userMail
        });

        axios.post('/home/update/comp/info', {
            compID: this.props.compID,
            compName: this.state.compName,
            compAddr: this.state.compAddr,
            compPhone: this.state.compPhone,
            compMail: this.state.compMail,
            compDesc: this.state.compDesc
        }).then(() => {
            toast.success("Údaje boli aktualizované");
            this.props.handler();
        });
    }

    //return html text
    render(){
        return(
            <div class="modal" id={'compUpdate_' + this.props.compID } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Aktualizovať informácie</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                    <form className='form'>
                            <div className='form-group'>
                                <strong>Názov</strong><br/> 
                                <input type="text"
                                       id="compName"
                                       className='form-control mb-3'
                                       value={ this.state.compName ?? ""}
                                       onChange={ this.compNameChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Popis</strong><br/> 
                                <input type="text"
                                       id="compDesc"
                                       className='form-control mb-3'
                                       value={ this.state.compDesc ?? ""}
                                       onChange={ this.compDescChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Email</strong><br/> 
                                <input type="text"
                                       id="compMail"
                                       className='form-control mb-3'
                                       value={ this.state.compMail ?? ""}
                                       onChange={ this.compMailChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Kontakt</strong><br/> 
                                <input type="text"
                                       id="compPhone"
                                       className='form-control mb-3'
                                       value={ this.state.compPhone ?? ""}
                                       onChange={ this.compPhoneChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Adresa</strong><br/> 
                                <input type="text"
                                       id="compAddr"
                                       className='form-control mb-3'
                                       value={ this.state.compAddr ?? ""}
                                       onChange={ this.compAddrChange }
                                />
                            </div>

                            <br/><h5><strong> Prihlasovacie údaje </strong></h5> <br/>

                            <div className='form-group'>
                                <strong>Meno</strong><br/> 
                                <input type="text"
                                       id="userName"
                                       className='form-control mb-3'
                                       value={ this.state.userName ?? ""}
                                       onChange={ this.userNameChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Priezvisko</strong><br/> 
                                <input type="text"
                                       id="userLast"
                                       className='form-control mb-3'
                                       value={ this.state.userLast ?? ""}
                                       onChange={ this.userLastChange }
                                />
                            </div>

                            <div className='form-group'>
                                <strong>Email</strong><br/> 
                                <input type="text"
                                       id="userMail"
                                       className='form-control mb-3'
                                       value={ this.state.userMail ?? ""}
                                       onChange={ this.userMailChange }
                                />
                            </div>

                        </form>
                    </div>

                    <div class="modal-footer">
                        <input type="submit"
                               className='btn btn-info'
                               value="Aktualizovať"
                               onClick={ this.updateComp }
                               data-bs-dismiss="modal"
                        />
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zavrieť</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompUpdate;
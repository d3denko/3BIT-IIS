/**
 * author: xhoril01
 * component: CompAdd
 * view: Admin - company list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in company list, it is a pop up modal for company adding
class CompAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            compName: "",
            compAddr: "",
            compPhone: "",
            compMail: "",
            compDesc: "",
            compPwd: "",
            username: "",
            userlast: "",
            usermail: "",
        }
    }

    //Change name
    compNameInput = (event) =>{
        this.setState({
            compName: event.target.value
        })
    }

    //Change address 
    compAddrInput = (event) =>{
        this.setState({
            compAddr: event.target.value
        })
    }

    //Change phone
    compPhoneInput = (event) =>{
        this.setState({
            compPhone: event.target.value
        })
    }

    //Change mail
    compMailInput = (event) =>{
        this.setState({
            compMail: event.target.value
        })
    }

    //Change description
    compDescInput = (event) =>{
        this.setState({
            compDesc: event.target.value
        })
    }

    //Change password
    compPwdInput = (event) =>{
        this.setState({
            compPwd: event.target.value
        })
    }

    //change username for company
    compUserNameInput = (event) =>{
        this.setState({
            username: event.target.value
        })
    }

    //change user last name for company
    compUserLastInput = (event) =>{
        this.setState({
            userlast: event.target.value
        })
    }

    //change user mail for company
    compUserMailInput = (event) =>{
        this.setState({
            usermail: event.target.value
        })
    }

    //check input and set changes to new company
    compAdd = async() => {
        const emailCheck = new RegExp('.+@.+\..+');
        let elem1 = document.getElementById("compName");
        let elem2 = document.getElementById("compAddr");
        let elem3 = document.getElementById("compPhone");
        let elem4 = document.getElementById("compMail");
        let elem5 = document.getElementById("compDesc");
        let elem6 = document.getElementById("userName");
        let elem7 = document.getElementById("userLast");
        let elem8 = document.getElementById("userMail");
        let elem9 = document.getElementById("compPwd");

        if(this.state.compName == ""){
            elem1.style.backgroundColor = "red";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem1.style.backgroundColor = "white";
        }
        let compEx = axios.get('/home/company_exists/'+this.state.compName);
        if(compEx == true){
            elem1.style.backgroundColor = "red";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem1.style.backgroundColor = "white";
        }

        if(this.state.compAddr == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "red";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem2.style.backgroundColor = "white";
        }

        if(this.state.compPhone == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "red";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem3.style.backgroundColor = "white";
        }

        if(this.state.compMail == "" || (!this.state.compMail.match(emailCheck))){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "red";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }

        if(this.state.username == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "red";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }

        if(this.state.userlast == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "red";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }

        if(this.state.usermail == "" || !this.state.usermail.match(emailCheck)){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "red";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }

        let exp = await axios.get('/home/user_exists/'+this.state.usermail);
        if(exp == true){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "red";
            elem9.style.backgroundColor = "white";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }

        if(this.state.compPwd == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            elem5.style.backgroundColor = "white";
            elem6.style.backgroundColor = "white";
            elem7.style.backgroundColor = "white";
            elem8.style.backgroundColor = "white";
            elem9.style.backgroundColor = "red";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }
        

        $('#compAdd').modal('hide');
        axios.post('/home/add/company', {
            compName: this.state.compName,
            compAddr: this.state.compAddr,
            compPhone: this.state.compPhone,
            compMail: this.state.compMail,
            compDesc: this.state.compDesc,
            compPwd: this.state.compPwd,
            username: this.state.username,
            userlast: this.state.userlast,
            usermail: this.state.usermail

        }).then(() => {
            toast.success("Údaje boli pridané");
            this.props.handler();
        });
    }

    //return html text
    render(){
        return(
            <>
                <div className='row text-right mb-3 pb-3'>
                    <button className='btn btn-primary text-right col-3 offset-md-9'
                            data-bs-toggle='modal'
                            data-bs-target='#compAdd'
                    >
                        Pridať firmu
                    </button>
                </div>
                <div className="modal" id='compAdd' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pridať firmu</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='form'>
                                    
                                    <div className='form-group'>
                                        <input type="text"
                                               id="compName"
                                               className='form-control mb-3'
                                               placeholder='Meno firmy'
                                               onChange={ this.compNameInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="compAddr"
                                               className='form-control mb-3'
                                               placeholder='Adresa firmy'
                                               onChange={ this.compAddrInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                            id="compPhone"
                                            className='form-control mb-3'
                                            placeholder='Kontakt'
                                            onChange={ this.compPhoneInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                            id="compMail"
                                            className='form-control mb-3'
                                            placeholder='Email firmy'
                                            onChange={ this.compMailInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                            id="compDesc"
                                            className='form-control mb-3'
                                            placeholder='Popis firmy'
                                            onChange={ this.compDescInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div>
                                        <h5><strong>Prihlasovacie údaje</strong></h5> 
                                    </div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="userName"
                                               className='form-control mb-3 password'
                                               placeholder='Meno'
                                               onChange={ this.compUserNameInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="userLast"
                                               className='form-control mb-3 password'
                                               placeholder='Priezvisko'
                                               onChange={ this.compUserLastInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="userMail"
                                               className='form-control mb-3 password'
                                               placeholder='Email'
                                               onChange={ this.compUserMailInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="password"
                                               id="compPwd"
                                               className='form-control mb-3 password'
                                               placeholder='Heslo'
                                               onChange={ this.compPwdInput }
                                        />
                                    </div>

                                    
                                </form>
                            </div>
                            <div className="modal-footer">
                                <input type="button"
                                    className='btn btn-info'
                                    value="Vytvoriť"
                                    onClick={ this.compAdd }
                                />

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zatvoriť</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CompAdd;
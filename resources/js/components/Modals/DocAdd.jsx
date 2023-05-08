/**
 * author: xhoril01
 * component: DocAdd
 * view: Doctor list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in doctor list, it is a pop up modal for doctor adding
class DocAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            docName: "",
            docLast: "",
            docMail: "",
            docPwd: "",
        }
    }

    //change name of doctor
    docNameInput = (event) =>{
        this.setState({
            docName: event.target.value
        })
    }

    //change last name of doctor
    docLastInput = (event) =>{
        this.setState({
            docLast: event.target.value
        })
    }

    //change email of doctor
    docEmailInput = (event) =>{
        this.setState({
            docMail: event.target.value
        })
    }

    //change password of doctor
    docPwdInput = (event) =>{
        this.setState({
            docPwd: event.target.value
        })
    }

    //check data and create new doctor
    docAdd = async() => {
        const emailCheck = new RegExp('.+@.+\..+');
        let elem1 = document.getElementById("docName");
        let elem2 = document.getElementById("docLast");
        let elem3 = document.getElementById("docMail");
        let elem4 = document.getElementById("docPwd");
        if(this.state.docName == ""){
            elem1.style.backgroundColor = "red";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem1.style.backgroundColor = "white";
        }

        if(this.state.docLast == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "red";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem2.style.backgroundColor = "white";
        }

        if(!this.state.docMail.match(emailCheck)){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "red";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem3.style.backgroundColor = "white";
        }
        let ex = await axios.get('/home/user_exists/'+this.state.docMail);
        console.log(ex.data);
        if(ex.data==true){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "red";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem3.style.backgroundColor = "white";
        }
        

        if(this.state.docPwd == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "red";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }

        $('#docAdd').modal('hide');

        axios.post('/home/add/doctor', {
            docName: this.state.docName,
            docLast: this.state.docLast,
            docMail: this.state.docMail,
            docPwd: this.state.docPwd
        }).then(() => {
            toast.success("Údaje boli pridané");
            //setTimeout(() => {location.reload();}, 2500)
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
                            data-bs-target='#docAdd'
                    >
                        Pridať doktora
                    </button>
                </div>
                <div className="modal" id='docAdd' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pridať doktora</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='form'>
                                    <div className='form-group'>
                                        <input type="text"
                                               id="docName"
                                               className='form-control mb-3'
                                               placeholder='Meno doktora'
                                               onChange={ this.docNameInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="docLast"
                                               className='form-control mb-3'
                                               placeholder='Priezvisko doktora'
                                               onChange={ this.docLastInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="docMail"
                                               className='form-control mb-3'
                                               placeholder='Email doktora'
                                               onChange={ this.docEmailInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="password"
                                               id="docPwd"
                                               className='form-control mb-3 password'
                                               placeholder='Heslo'
                                               onChange={ this.docPwdInput }
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <input type="button"
                                    className='btn btn-info'
                                    value="Vytvoriť"
                                    onClick={ this.docAdd }
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

export default DocAdd;
/**
 * author: xhoril01
 * component: DrugAdd
 * view: Medicine list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Class component - this component is used in medicine list, it is a pop up modal for medicine adding
class DrugAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            drugName: "",
            drugVers: "",
            drugType: "",
            compID: "",
            companies: []
        }
    }

    componentDidMount() {
        this.getCompsInfo();
    }

    //gets data about medicine companies
    getCompsInfo=()=>{
        let self = this;
        axios.get('/home/get/companies/info').then(function(response){
            self.setState({
                companies: response.data
            });
        });
    }

    //change name of medicine
    drugNameInput = (event) =>{
        this.setState({
            drugName: event.target.value
        })
    }

    //change version of medicine
    drugVersrInput = (event) =>{
        this.setState({
            drugVers: event.target.value
        })
    }

    //change type of medicine
    drugTypeInput = (event) =>{
        this.setState({
            drugType: event.target.value
        })
    }

    //change company
    compNameInput = (event) =>{
        this.setState({
            compID: event.target.value
        })
    }

    //check and add medicines
    drugAdd = async() => {

        let elem1 = document.getElementById('drugname');
        let elem2 = document.getElementById('drugVers');
        let elem3 = document.getElementById('drugType');
        let elem4 = document.getElementById('compSel');


        if(this.state.drugName == ""){
            elem1.style.backgroundColor = "red";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem1.style.backgroundColor = "white";
        }
        let xx = axios.get('/home/drug_exists/'+this.state.drugName);
        if(xx==true){
            elem1.style.backgroundColor = "red";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem1.style.backgroundColor = "white";
        }

        if(this.state.drugVers == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "red";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem2.style.backgroundColor = "white";
        }

        if(this.state.drugType == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "red";
            elem4.style.backgroundColor = "white";
            return;
        }else{
            elem3.style.backgroundColor = "white";
        }

        if(this.state.compID == ""){
            elem1.style.backgroundColor = "white";
            elem2.style.backgroundColor = "white";
            elem3.style.backgroundColor = "white";
            elem4.style.backgroundColor = "red";
            return;
        }else{
            elem4.style.backgroundColor = "white";
        }
        $('#drugAdd').modal('hide');

        axios.post('/home/add/drug', {
            drugName: this.state.drugName,
            drugVers: this.state.drugVers,
            drugType: this.state.drugType,
            compID: this.state.compID,

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
                            data-bs-target='#drugAdd'
                    >
                        Pridať liek
                    </button>
                </div>
                <div className="modal" id='drugAdd' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pridať liek</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='form'>
                                    
                                    <div className='form-group'>
                                        <input type="text"
                                               id="drugname"
                                               className='form-control mb-3'
                                               placeholder='Názov lieku'
                                               onChange={ this.drugNameInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                               id="drugVers"
                                               className='form-control mb-3'
                                               placeholder='Verzia lieku'
                                               onChange={ this.drugVersrInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <div className='form-group'>
                                        <input type="text"
                                            id="drugType"
                                            className='form-control mb-3'
                                            placeholder='Typ lieku'
                                            onChange={ this.drugTypeInput }
                                        />
                                    </div>

                                    <div><br/></div>

                                    <select id="compSel" className="form-select" onChange={this.compNameInput}>
                                        <option selected disabled> Zvoľte firmu </option>
                                        
                                        {this.state.companies.map(displayComp => (
                                            <option value={displayComp.id}>{displayComp.name}</option>
                                        ))}

                                    </select>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <input type="button"
                                    className='btn btn-info'
                                    value="Vytvoriť"
                                    onClick={ this.drugAdd }
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

export default DrugAdd;
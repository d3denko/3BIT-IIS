/**
 * author: xhoril01
 * component: Drugs
 * view: Admin view, medicines list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrugRow from './Tables/DrugRow';
import DrugAdd from './Modals/DrugAdd';

// Class component - this component is a row in table in admin view, medicines list
class Drugs extends Component{

    constructor(props){
        super(props);
        this.state = {
            drugs: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    //inner refresh of table
    refresh=async()=>{
        await this.getDrugsInfo();
        this.clear();
        this.spawn();
    }

    //add new rows
    spawn=()=>{
        const myNode = document.getElementById("myttbody");
        for(let i = 0; i < this.state.drugs.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<DrugRow key={i} data={this.state.drugs[i]} handler={this.refresh} />,elem);
            myNode.appendChild(elem); 
        };   
    }

    //clean old rows
    clear=()=>{
        var myNode = document.getElementById("myttbody");      
        for(var i = myNode.rows.length - 1; i >= 0; i--)
        {
            myNode.deleteRow(i);
        } 
    }

    //gets medicines list
    getDrugsInfo=async()=>{
        let response = await axios.get('/home/get/drugs/info');
        this.state.drugs = response.data;
    }

    //return html text
    render(){
        return(
            <div className='container'>
                <ToastContainer/>
                <DrugAdd handler={this.refresh}/>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'> LIEKY </div>
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Meno</th>
                                        <th scope='col'>Možnosti</th>
                                    </tr>
                                </thead>

                                <tbody id="myttbody">
                                    { this.state.drugs.map(function(x,i) {
                                        return <DrugRow key={i} data={x} />
                                    })} 
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
            </div>
            );
        }
}

export default Drugs;

if (document.getElementById('drug_view')) {
    ReactDOM.render(<Drugs/>, document.getElementById('drug_view'));
}
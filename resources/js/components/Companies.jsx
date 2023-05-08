/**
 * author: xhoril01
 * component: Companies
 * view: Admin view, companies list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompanyRow from './Tables/CompanyRow';
import CompAdd from './Modals/CompAdd';

// Class component - this component is a row in table in admin view, companies list
class Companies extends Component{

    constructor(props){
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    //get list of companies
    getCompsInfo=async()=>{
        let response = await axios.get('/home/get/companies/info');
        this.state.companies = response.data;
        console.log(this.state.companies);
    }

    //inner refresh of table
    refresh=async()=>{
        await this.getCompsInfo();
        this.clean_rows();
        this.add_rows();
    }

    //remove old rows
    clean_rows=()=>{
        var myNode = document.getElementById("comp_t_body");      
        for(var i = myNode.rows.length - 1; i >= 0; i--)
        {
            myNode.deleteRow(i);
        } 
    }

    //add new rows
    add_rows=()=>{
        console.log(this.state.companies);
        const myNode = document.getElementById("comp_t_body");
        for(let i = 0; i < this.state.companies.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<CompanyRow key={i} data={this.state.companies[i]} handler={this.refresh}/>,elem);
            myNode.appendChild(elem); 
        };   
    }

    //return html text
    render(){
        return(
            <div className='container'>
                <ToastContainer/>
                <CompAdd handler={this.refresh}/>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'> FIRMY </div>
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Meno</th>
                                        <th scope='col'>Popis</th>
                                        <th scope='col'>Možnosti</th>
                                    </tr>
                                </thead>

                                <tbody id="comp_t_body">
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
            </div>
            );
        }
}

export default Companies;

if (document.getElementById('company_view')) {
    ReactDOM.render(<Companies/>, document.getElementById('company_view'));
}
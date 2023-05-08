/**
 * author: xhoril01
 * component: DoctorRow
 * view: Admin view, Doctor list
 */

import axios from 'axios';
import React,{ Component } from 'react';
import DocInfo from '../Modals/DocInfo';
import DocUpdate from '../Modals/DocUpdate';
import DocDelete from '../Modals/DocDelete';

// Class component - this component is a row in table in admin view, doctor list
class DoctorRow extends Component{

    constructor(props){
        super(props);

        this.state = {
            docName: null,
            docLast: null,
            docMail: null,
            handler: props.handler
        };
    }

    //gets info from database
    getInfo = (id) =>{
        axios.post('/home/get/doc/details', 
        {docID: id}).then((response) => {
            this.setState({
                docName: response.data.name,
                docLast: response.data.last_name,
                docMail: response.data.email
            })
        });
    }

    //returns html text
    render(){
        return(
            <>    
                <th scope='row'> { this.props.data.id } </th>
                <td> { this.props.data.name } </td>
                <td> { this.props.data.last_name } </td>
                <td> { this.props.data.email } </td>
                <td>
                    <div class="btn-group" role="group">
                        
                        <button type="button"
                                class="btn btn-outline-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target={'#docInfo_' + this.props.data.id }
                                onClick={() => { this.getInfo(this.props.data.id) }}
                                >
                                    Zobraziť

                        </button>
                        <DocInfo docID = {this.props.data.id} data = {this.state}/>

                        <button type="button"
                                class="btn btn-outline-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target={'#docUpdate_' + this.props.data.id }
                                onClick={() => { this.getInfo(this.props.data.id) }}
                                >
                                    Upraviť
                        </button>
                        <DocUpdate docID = {this.props.data.id} data = {this.state} handler={this.state.handler}/>

                        <DocDelete docID = {this.props.data.id} handler={this.state.handler} />
                        <button type="button"
                                class="btn btn-outline-danger" 
                                data-bs-toggle="modal" 
                                data-bs-target={'#docDelete_' + this.props.data.id }
                                >
                                    Vymazať
                        </button>
                        
                    </div>
                </td>
            </>
        )
    }
}

export default DoctorRow;
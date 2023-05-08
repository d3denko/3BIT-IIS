/**
 * author: xhoril01
 * component: CompanyRow
 * view: Admin view, Company list
 */

import React,{ Component } from 'react';
import CompInfo from '../Modals/CompInfo';
import CompUpdate from '../Modals/CompUpdate';
import CompDelete from '../Modals/CompDelete';

// Class component - this component is a row in table in admin view, companies list
class CompanyRow extends Component{

    constructor(props){
        super(props);

        this.state = {
            compName: null,
            compAddr: null,
            compPhone: null,
            compMail: null,
            compDesc: null,
            userID: null,
            userName: null,
            userLast: null,
            userMail: null
        }
    }

    //get info about company
    getInfo = (id) => {
        axios.post('/home/get/comp/details', {compID: id}).then((response) => {
            this.setState({
                compName: response.data.name,
                compAddr: response.data.location,
                compPhone: response.data.phone,
                compMail: response.data.mail,
                compDesc: response.data.desc,
                userID: response.data.user_id
            })
        })

        axios.post('/home/get/comp/user', {compID: id}).then((response) => {
            this.setState({
                userName: response.data.name,
                userLast: response.data.last_name,
                userMail: response.data.email,
            })
        })
    }

    //return html text
    render(){
        return(
            <>    
                <th scope='row'> { this.props.data.id } </th>
                <td> { this.props.data.name } </td>
                <td> { this.props.data.desc } </td>
                <td>
                    <div class="btn-group" role="group">
                        
                        <button type="button"
                                class="btn btn-outline-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target={'#compInfo_' + this.props.data.id }
                                onClick={() => { this.getInfo(this.props.data.id) }}
                                >
                                    Zobraziť

                        </button>
                        <CompInfo compID = {this.props.data.id} data = {this.state}/>

                        <button type="button"
                                class="btn btn-outline-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target={'#compUpdate_' + this.props.data.id }
                                onClick={() => { this.getInfo(this.props.data.id) }}
                                >
                                    Upraviť
                        </button>
                        <CompUpdate compID = {this.props.data.id} data = {this.state} handler={this.props.handler}/>

                        <CompDelete compID = {this.props.data.id} userID = {this.state.userID} handler={this.props.handler}/>
                        <button type="button"
                                class="btn btn-outline-danger" 
                                data-bs-toggle="modal" 
                                data-bs-target={'#compDelete_' + this.props.data.id }
                                onClick={() => { this.getInfo(this.props.data.id) }}
                                >
                                    Vymazať
                        </button>

                    </div>
                </td>
            </>
        )
    }
}

export default CompanyRow;
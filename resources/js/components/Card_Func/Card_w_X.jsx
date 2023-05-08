/**
 * author: xlukac16
 * component: Card_w_X
 * view: Generator grafov
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { AiFillCloseCircle } from "react-icons/ai";

// Class component - this component is used in graph generator as name of filter, when there are multiple filters
class Card_w_X extends Component{

    constructor(props){
        super(props); 

        this.state = {
            number: this.props.number,
            name: this.props.name,
            onSelect: this.props.onSelect,
            onDelete: this.props.onDelete,
            selected: this.props.selected
        }
    }

    //Filter is chosen for edit
    name_pressed=()=>{
        this.state.onSelect(this.state.number);
    }

    //Closes the filter
    x_pressed=()=>{
        this.state.onDelete(this.state.number);
    }

    //Checks if this filter is selected
    selectedF=()=>{
        if(this.state.selected=="1"){
            return "btn btn-info col-md-6 fs-5";
        }else{
            return "btn btn-outline-info col-md-6 fs-5";
        }
    }

    //Return html text
    render() {
        let self = this;
        return (
            <div className='row' >
                <div className='col-md-1'/>
                <input className={ this.selectedF() } onClick={this.name_pressed} type="button" value={this.state.name}/>
                <div className='col-md-1'/>
                <input className='col-md-2 fs-5 fw-bolder btn btn-danger' onClick={this.x_pressed} type="button" value="X"/>
            </div>
        );
    }
}
export default Card_w_X;
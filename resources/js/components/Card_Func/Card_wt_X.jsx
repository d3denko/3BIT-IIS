/**
 * author: xlukac16
 * component: Card_wt_X
 * view: Generator grafov
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

// Class component - this component is used in graph generator as name of filter, when there is single filter
class Card_wt_X extends Component{

    constructor(props){
        super(props); 

        this.state = {
            number: this.props.number,
            name: this.props.name,
            onSelect: this.props.onSelect,
            selected: this.props.selected
        }
    }

    //Get name of filter
    get_name=()=>{
        return this.state.name;
    }

    //Check if name is pressed
    name_pressed=()=>{
        this.state.onSelect(this.state.number);
    }

    //Return html text
    render() {
        let self = this;
        return (
            <input className='btn btn-info fs-5' onClick={this.name_pressed} type="button" value={this.get_name()}/>
        );
    }
}
export default Card_wt_X;
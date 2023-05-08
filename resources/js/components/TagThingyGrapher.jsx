/**
 * author: xlukac16
 * component: TagThingyGrapher
 * view: Doctor and compant view, graph generator
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { AiFillCloseCircle } from "react-icons/ai";

// Class component - this component is a drawn tag button on graph screen
class TagThingyGrapher extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: props.name,
            close: props.handler,
        }
        
    }

    //remove selected tag from filter
    closer=()=>{
        this.props.handler(this.state.name);
    }

    //return html text
    render() {
        let self = this;
        return (
            <>
                <td className='fs-5 fw-lighter'>{this.state.name}</td>
                <td> <AiFillCloseCircle type="button" class="text-danger fs-4 fw-bolder" onClick={self.closer}/> </td>
            </>
        );
    }
}
export default TagThingyGrapher;
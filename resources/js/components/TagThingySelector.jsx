/**
 * author: xlukac16
 * component: TagThingySelector
 * view: Doctor and compant view, graph generator
 */


import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

// Class component - this component is in a modal used for selecting new tags for filter
class TagThingySelector extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: props.name,
            handler: props.handler,
        }
        
    }

    //add selected tag
    functt=()=>{
        this.state.handler(this.state.name);
    }

    //return html text
    render() {
        let self = this;
        return (
            <div id="TagThingySelector">
                <span type="button" 
                      data-bs-dismiss="modal" 
                      class="text-dark fs-5 fw-light" 
                      style={{marginBottom: 5, marginTop: 5}} 
                      onClick={self.functt}>
                       
                        { self.state.name }
                </span>
                
                <div/>
            </div>
        );
    }
}
export default TagThingySelector;
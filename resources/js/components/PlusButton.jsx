/**
 * author: xlukac16
 * component: PlusButton
 * view: Doctor and compant view, graph generator
 */

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import TagGetterWindow from './TagGetterWindow';
import { IoIosAddCircleOutline } from "react-icons/io";

// Class component - this component is a plus button to add new tags to filters
class PlusButton extends Component{

    constructor(props){
        super(props);

        this.state = {
            type: props.type,
            handler: props.handler,
        }
        
    }

    //get id of connected modal
    get_modal_id=()=>{
        return "#tag_modal"+this.state.type;
    }

    //returm html text 
    render() {
        let self = this;
        return (
            <div id="plus_button">
                <IoIosAddCircleOutline type="button" class="text-primary fs-4" data-bs-toggle="modal" data-bs-target={self.get_modal_id()}/>
                <TagGetterWindow type={self.state.type} handler={self.state.handler} />
            </div>
        );
    }
}
export default PlusButton;

if (document.getElementById('plus_butt')) {
    ReactDOM.render(<PlusButton />, document.getElementById('plus_butt'));
}
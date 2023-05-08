/**
 * author: xlukac16
 * component: SearchBar
 * view: Doctor and compant view, graph generator
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

// Class component - this component is a search or input bar, used in multiple views
class SearchBar extends Component{

    constructor(props){
        super(props);

        this.state = {
            sid: props.sid,
            handler: props.handler,
        }
        
    }

    //call handler function with input
    search=()=>{
        var x = document.getElementById("in_search"+this.state.sid).value;
        this.state.handler(x);
    }

    //Generate id for searchbar
    gid=()=>{
        return ("in_search"+this.state.sid);
    }

    //return html text
    render() {
        let self = this;
        return (
            <div id="searching_bar">
                <input id={self.gid()} onChange={()=>self.search()} type="text" placeholder="Vyhľadať..." />
            </div>
        );
    }
}
export default SearchBar;
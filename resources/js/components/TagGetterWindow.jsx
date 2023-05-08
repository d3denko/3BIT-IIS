/**
 * author: xlukac16
 * component: TagGetterWindow
 * view: Doctor and compant view, graph generator
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import TagThingySelector from './TagThingySelector';

// Class component - this component is a modal used for selecting new tags for filter
class TagGetterWindow extends Component{

    constructor(props){
        super(props);

        this.state = {
            sid: props.id,
            handler: props.handler,
            target: props.type,
            id: "Tag_Getter"+props.type,
            modal_id: "tag_modal"+props.type,
        }
        
1    }

    componentDidMount(){
        this.search("");
    }

    //search for term in search bar
    search=(searched)=>{
        this.removeOldTags();
        let self =this;
        if(this.state.target=="Display_Vals"){
            self.addNewTags(["VAS pacient","VAS doktor",
            //"VAS priemer",
            "Rontgenove poskodenie","pocet bolestivych klbov"
            ,"pocet napuchnutych klbov","hodnota sedimentacie","CRP","DAS","HQ"]);
        }
        else if(this.state.target=="State_White" || this.state.target=="State_Black"){
            axios.get('/home/get/filters/state_data',{params:{searched}}).then(function(response){
                self.addNewTags(response.data);
            });
        }else{
            axios.get('/home/get/filters/medicine_data',{params:{searched}}).then(function(response){
                self.addNewTags(response.data);
            });
        }

    }

    //remove old tags
    removeOldTags=()=>{
        let self = this;
        const myNode = document.getElementById(self.state.id);
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    }

    //add new tags
    addNewTags=(dataDocument)=>{
        let self = this;
        const myNode = document.getElementById(self.state.id);
        for(let i = 0; i < dataDocument.length;i++){
            const elem = document.createElement("div");
            ReactDOM.render(<TagThingySelector name={dataDocument[i]} handler={self.selfunc}/>,elem);
            myNode.appendChild(elem); 
        };
    }

    //add selected tag to filter
    selfunc=(val)=>{
        document.getElementById("in_search"+this.state.target).value="";
        this.search("");
        this.state.handler(val);
    }

    //Get title of modal
    getTitle=()=>{
        if(this.state.target == "State_White")
            return "Vymedziť graf na stav:";
        else if(this.state.target == "State_Black")
            return "Ignorovať prípady pri stave:";
        else if(this.state.target == "Medicine_White")
            return "Vymedziť graf na liek:";
        else
            return "Ignorovať prípady pri lieku:";
    }

    //return html text
    render() {
        let self = this;
        return (
            <div class="modal fade" id={self.state.modal_id} tabindex="-1" aria-labelledby="tag_modal_label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 fw-bold" id="tag_modal_label">{self.getTitle()}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div class="modal-body">
                            <div id="TagGetterWindowDiv">
                                <SearchBar sid={self.state.target} handler={self.search} />
                                <div id={self.state.id} width="300px" height="500px" overflow-y="scroll">

                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TagGetterWindow;


/*
<div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    */
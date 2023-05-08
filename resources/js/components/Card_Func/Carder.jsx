/**
 * author: xlukac16
 * component: Carder
 * view: Generator grafov
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Card_w_X from './Card_w_X';
import Card_wt_X from './Card_wt_X';

// Class component - this component is used in graph generator, it is parent component of filters
class Carder extends Component{

    //Setup
    constructor(props){
        super(props);

        this.state = {
            filterSets: ["Nový filter"],
            selected: 0,
            onCreate: this.props.onCreate,
            onSelect: this.props.onSelect,
            onDelete: this.props.onDelete,
            onRename: this.props.onRename,
        }
    }
    componentDidMount=()=>{
        this.props.re(this.filterRename);
        this.props.rf(this.refresh);
        this.refresh();
    }

    //Closes selected filters
    filterClose=(numberFilter)=>{        
        this.state.filterSets.splice(numberFilter, 1);
        this.state.onDelete(numberFilter);
        this.refresh();
    }

    //Adds new filter
    filterNew=()=>{
        this.state.filterSets.push("Nový filter");
        this.state.onCreate("Nový filter");
        this.filterSelected(this.state.filterSets.length-1);
    }

    //Select clicked filter
    filterSelected=(numberOfFilter)=>{
        this.state.selected = numberOfFilter;
        this.state.onSelect(numberOfFilter);
        this.refresh();
    }

    //Renames selected filter
    filterRename=(newName)=>{
        this.state.filterSets[this.state.selected]=newName;
        this.refresh();
    }

    //This function is called when any filter is created, closed, selected or renamed to redraw the page
    refresh=()=>{
        this.cleanButtons();
        this.spawnButtons();
    }

    //Removes old buttons on refresh
    cleanButtons=()=>{
        const myNode = document.getElementById("card_div");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.lastChild);
        }
    }

    //Spawns new buttons on refresh
    spawnButtons=()=>{
        const main_node = document.getElementById("card_div");
        if(this.state.filterSets.length == 1){
            const new_node = document.createElement("div");
            new_node.className="col-md-3";
            ReactDOM.render(<Card_wt_X  number='0' name={this.state.filterSets[0]} onSelect={this.filterSelected} selected="1" />,new_node);
            main_node.appendChild(new_node);
        }else{
            for(let i = 0; i < this.state.filterSets.length; i++){
                const new_node = document.createElement("div");
                new_node.className="col-md-3";
                if(this.state.selected == i)
                    ReactDOM.render(<Card_w_X number={i} name={this.state.filterSets[i]} onSelect={this.filterSelected} onDelete={this.filterClose} selected="1" />,new_node);
                else
                    ReactDOM.render(<Card_w_X number={i} name={this.state.filterSets[i]} onSelect={this.filterSelected} onDelete={this.filterClose} selected="0" />,new_node);
                main_node.appendChild(new_node);
            }
        }
        if(this.state.filterSets.length<4){
            const plus_node = document.createElement("input");
            plus_node.type = "button";
            plus_node.value = "+";
            plus_node.className = "col-md-2 btn btn-dark fs-5 fw-bolder";
            let self = this;
            plus_node.onclick = function() { self.filterNew(); };

            main_node.appendChild(plus_node);
        }
    }

    //Returns html text
    render() {
        let self = this;
        return (
            <div id="card_div" className="row">

            </div>
        );
    }
}
export default Carder;
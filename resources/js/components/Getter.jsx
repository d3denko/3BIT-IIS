/**
 * author: xlukac16
 * component: Getter
 * view: Doctor and company view, graph creator
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import { now } from 'lodash';
import PlusButton from './PlusButton';
import TagGetterWindow from './TagGetterWindow';
import TagThingyGrapher from './TagThingyGrapher';
import GraphItself from './GraphItself';
import Carder from './Card_Func/Carder';

// Class component - this component is a main component in graph creator
class Getter extends Component{

    constructor(props){
        super(props);

        this.state = {
            selected_value:"VAS doktor",
            date_from:"",
            date_till:"",
            graph_type: 0,
            
            selected: 0,
            filter_sets:[
                {
                name: "Nový filter",
                filter_state_whitelist: [],
                filter_state_blacklist: [],
                filter_medicine_whitelist: [],
                filter_medicine_blacklist: [],
                },
            ],


            refresh_func: "",
            rename_func:""
        }
    }

    componentDidMount(){
        this.Refresh();
    }

    //FilterGroups

    //Adds new filter group
    AddNewFilter=()=>{
        this.state.filter_sets.push(
            {
                name: "Nový filter",
                filter_state_whitelist: [],
                filter_state_blacklist: [],
                filter_medicine_whitelist: [],
                filter_medicine_blacklist: [],
            }
        )
    }

    //Removes selected filter group
    RemoveFilter=(removeThisOne)=>{
        this.state.filter_sets.splice(removeThisOne, 1);
    }

    //Choose selected group as active
    SelectFilter=(selected)=>{
        this.state.selected = selected;

        this.Refresh();
    }

    //Changes selected filter name to new name
    ChangeFillName=()=>{
        let nn = document.getElementById('my_filter_naaame').value;
        this.state.filter_sets[this.state.selected].name = nn;
        this.state.rename_func(nn);
        this.state.refresh_func();
    }

    //Passes function to rename to designated subcomponent
    GetRenameFunc=(func)=>{
        this.state.rename_func=func;
    }

    //Passes function to refresh to designated subcomponent
    GetRefreshFunc=(func)=>{
        this.state.refresh_func=func;
    }


    //Data getter

    //Gets data about possible filter, t.j. states and medicines
    getTreatmentData=async(childFunc)=>{
        let data = JSON.stringify(this.state);
        let response = await axios.get('/home/get/treatments/filter',{params:{data}});
        childFunc(response.data);
    }


    //Global graph variables

    //Set graph type
    SetGraphType=()=>{
        this.state.graph_type = document.getElementById('my_select_type').value;
    }

    //Set value of graph
    SetGraphValue=()=>{
        this.state.graph_value = document.getElementById('my_select_value').value;
    }

    //Set date from which the graph is drawn
    SetFromDate=()=>{
        this.state.date_from = document.getElementById('mm_date_from').value;;
    }

    //Set date till which the graph is drawn
    SetTillDate=()=>{
        this.state.date_till = document.getElementById('mm_date_till').value;;
    }


    //Tag work

    //Refresh all tags drawn
    Refresh=()=>{
        this.RemoveOldTags();
        this.GenerateBlackMedicines();
        this.GenerateWhiteMedicines();
        this.GenerateWhiteStates();
        this.GenerateBlackStates();
    }

    //Remove old drawn tags
    RemoveOldTags=()=>{
        var myNode = document.getElementById("my_white_medicine");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        myNode = document.getElementById("my_black_medicine");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        myNode = document.getElementById("my_white_state");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        myNode = document.getElementById("my_black_state");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    }

    //Generators

    //Generate whitelisted medicines for selected filter
    GenerateWhiteMedicines=()=>{
        let self = this;
        const myNode = document.getElementById("my_white_medicine");
        for(let i = 0; i < this.state.filter_sets[this.state.selected].filter_medicine_whitelist.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<TagThingyGrapher name={this.state.filter_sets[this.state.selected].filter_medicine_whitelist[i]} handler={self.RemoveMedicineWhite}/>,elem);
            myNode.appendChild(elem); 
        };
    }
    //Generate blacklisted medicines for selected filter
    GenerateBlackMedicines=()=>{
        let self = this;
        const myNode = document.getElementById("my_black_medicine");
        for(let i = 0; i < this.state.filter_sets[this.state.selected].filter_medicine_blacklist.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<TagThingyGrapher name={this.state.filter_sets[this.state.selected].filter_medicine_blacklist[i]} handler={self.RemoveMedicineBlack}/>,elem);
            myNode.appendChild(elem); 
        };
    }
    //Generate whitelisted states for selected filter
    GenerateWhiteStates=()=>{
        let self = this;
        const myNode = document.getElementById("my_white_state");
        for(let i = 0; i < this.state.filter_sets[this.state.selected].filter_state_whitelist.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<TagThingyGrapher name={this.state.filter_sets[this.state.selected].filter_state_whitelist[i]} handler={self.RemoveStateWhite}/>,elem);
            myNode.appendChild(elem); 
        };
    }
    //Generate blacklisted states for selected filter
    GenerateBlackStates=()=>{
        let self = this;
        const myNode = document.getElementById("my_black_state");
        for(let i = 0; i < this.state.filter_sets[this.state.selected].filter_state_blacklist.length;i++){
            const elem = document.createElement("tr");
            ReactDOM.render(<TagThingyGrapher name={this.state.filter_sets[this.state.selected].filter_state_blacklist[i]} handler={self.RemoveStateBlack}/>,elem);
            myNode.appendChild(elem); 
        };
    }

    //Adders

    //Add state to whitelist
    AddWhiteState=(state)=>{
        this.state.filter_sets[this.state.selected].filter_state_whitelist.push(state);
        this.Refresh();
    }
    //Add state to blacklist
    AddBlackState=(state)=>{
        this.state.filter_sets[this.state.selected].filter_state_blacklist.push(state);
        this.Refresh();
    }
    //Add medicine to whitelist
    AddWhiteMedicine=(state)=>{
        this.state.filter_sets[this.state.selected].filter_medicine_whitelist.push(state);
        this.Refresh();
    }
    //Add medicine to blacklist
    AddBlackMedicine=(state)=>{
        this.state.filter_sets[this.state.selected].filter_medicine_blacklist.push(state);
        this.Refresh();
    }

    //Removers
    
    //Remove drawn whitelist states
    RemoveStateWhite=(state)=>{
        const index = this.state.filter_sets[this.state.selected].filter_state_whitelist.indexOf(state);
        if (index > -1) { 
            this.state.filter_sets[this.state.selected].filter_state_whitelist.splice(index, 1);
        }
        this.Refresh();
    }
    //Remove drawn blacklist states
    RemoveStateBlack=(state)=>{
        const index = this.state.filter_sets[this.state.selected].filter_state_blacklist.indexOf(state);
        if (index > -1) { 
            this.state.filter_sets[this.state.selected].filter_state_blacklist.splice(index, 1);
        }
        this.Refresh();
    }
    //Remove drawn whitelist medicines
    RemoveMedicineWhite=(state)=>{
        const index = this.state.filter_sets[this.state.selected].filter_medicine_whitelist.indexOf(state);
        if (index > -1) { 
            this.state.filter_sets[this.state.selected].filter_medicine_whitelist.splice(index, 1);
        }
        this.Refresh();
    }
    //Remove drawn blacklist medicines
    RemoveMedicineBlack=(state)=>{
        const index = this.state.filter_sets[this.state.selected].filter_medicine_blacklist.indexOf(state);
        if (index > -1) { 
            this.state.filter_sets[this.state.selected].filter_medicine_blacklist.splice(index, 1);
        }
        this.Refresh();
    }

    //return html text
    render() {
        let self = this;
        return (
            <div className='card border-dark bg-white'>
                <div className='card-body'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-3'>
                            <label for='my_select_type' className='fs-5' style={{marginRight: 10}}><strong>Typ grafu: </strong></label>
                            <select onChange={self.SetGraphType} id="my_select_type" class="graph-type " name="mm_graph_type">
                                <option value="0">Čiarový</option>
                                <option value="1">Stĺpcový</option>
                                <option value="2">Vyplnený</option>
                            </select>
                        </div>

                        <div className='col-md-5'>
                            <label for='my_select_value' className='fs-5' style={{marginRight: 10}}><strong>Zvolené hodnoty: </strong></label>
                            <select onChange={self.SetGraphValue} id="my_select_value" class="graph-type" name="mm_graph_type">
                                <option value="VASp">VAS hodnota pacienta</option>
                                <option value="VAS">VAS hodnota</option>
                                <option value="DAS">DAS hodnota</option>
                                <option value="HQp">HQ pacienta</option>
                                <option value="CRP">CRP hodnota</option>
                                <option value="Sediment">Hodnota sedimentácie</option>
                                <option value="Ront">Röntgenové poškodenie</option>
                                <option value="Func">Funkčné poškodenie</option>
                                <option value="Pain">Počet bolestivých kĺbov</option>
                                <option value="Swell">Počet napuchnutých kĺbov</option>
                            </select>
                        </div>      
                    </div>

                    <div id="my_display_getter">
                        <GraphItself handler={self.getTreatmentData}/>
                    </div>

                    <div className="d-flex justify-content-around fs-5">
                        <div className="p-2">
                            <label for='mm_date_from' style={{marginRight: 10}}><strong>Od: </strong></label>
                            <input onChange={self.SetFromDate} type="date" id="mm_date_from"/>
                        </div>
                        <div className="p-2">
                            <label for='mm_date_till' style={{marginRight: 10}}><strong>Do: </strong></label>
                            <input onChange={self.SetTillDate} type="date" id="mm_date_till"/>
                        </div>
                    </div>

                    <div>
                        <br/>
                    </div>

                    <div id="carder">
                        <Carder re={this.GetRenameFunc}
                                rf={this.GetRefreshFunc} 
                                onRename={this.ChangeFillName} 
                                onCreate={this.AddNewFilter} 
                                onSelect={this.SelectFilter} 
                                onDelete={this.RemoveFilter} />
                    </div>

                    <div>
                        <br/>
                    </div>

                    <div className='row'>   
                        <div className='col-md-4'>
                            <label for='my_filter_naaame' className='fs-5' style={{marginRight: 10, marginLeft: 10}}><strong>Názov filtra: </strong></label>
                            <input type="text" id="my_filter_naaame" onChange={this.ChangeFillName}/>
                        </div>
                    </div>

                    <div>
                        <br/>
                    </div>

                    <div className='row'>
                        <div className='col-md-3'>
                            <table class="table align-middle">
                                <thead className='fs-5'>
                                    <tr>
                                        <th scope="col">Vymedziť na liek </th>
                                        <th scope="col">
                                            <PlusButton type="Medicine_White" handler={self.AddWhiteMedicine}/>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id='my_white_medicine' >

                                </tbody>
                            </table>
                        </div>

                        <div className='col-md-3' >
                            <table class="table align-middle">
                                <thead className='fs-5'>
                                    <tr>
                                        <th scope="col">Vynechať liek </th>
                                        <th scope="col">
                                            <PlusButton type="Medicine_Black" handler={self.AddBlackMedicine}/>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="my_black_medicine">

                                </tbody>
                            </table>
                        </div>

                        <div className='col-md-3' >
                            <table class="table align-middle">
                                <thead className='fs-5'>
                                    <tr>
                                        <th scope="col">Vymedziť na stav </th>
                                        <th scope="col">
                                            <PlusButton type="State_White" handler={self.AddWhiteState}/>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="my_white_state">
                                </tbody>
                            </table>
                        </div>

                        <div className='col-md-3' >
                            <table class="table align-middle">
                                <thead className='fs-5'>
                                    <tr>
                                        <th scope="col">Vynechať stav </th>
                                        <th scope="col">
                                            <PlusButton type="State_Black" handler={self.AddBlackState}/>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="my_black_state">

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Getter;

if (document.getElementById('getter')) {
    ReactDOM.render(<Getter />, document.getElementById('getter'));
}
// <PlusButton type="State_Black" handler={self.AddBlackState}/>
// <PlusButton type="State_White" handler={self.AddWhiteState}/>
// <PlusButton type="Medicine_Black" handler={self.AddBlackMedicine}/>
// <PlusButton type="Medicine_White" handler={self.AddWhiteMedicine}/>
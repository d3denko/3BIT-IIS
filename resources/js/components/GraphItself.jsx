/**
 * author: xlukac16
 * component: GraphItself
 * view: Doctor and company view, graph creator
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';


import Chart from 'chart.js/auto';
//import './mychart.js';

import {format, parseISO,subDays} from "date-fns";
import Loader from './Loader';
import formatDistanceToNowStrict from 'date-fns/esm/formatDistanceToNowStrict/index.js';

// Class component - this component is a graph component in graph creator
class GraphItself extends Component{

    constructor(props){
        super(props);


        this.state = {
            handler: this.props.handler,
            cur_chart: "Nope",
        }

    }

    //load data from selected params
    load_data=async()=>{
        this.addLoad();
        if(this.state.cur_chart != "Nope") this.state.cur_chart.destroy();
        this.state.handler(this.rewrite_graph);
    }   

    //rewrite graph based on database response
    rewrite_graph=(data)=>{
        let config_data  = {
            labels: data['date'],
            datasets: [{
                label: data['0'].name,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data['0'].values,
                fill: this.getGType(data['type'])
            }]
        };
        if(data['1']!=undefined){
        config_data.datasets.push(
            {
                label: data['1'].name,
                backgroundColor: 'rgb(19, 52, 105)',
                borderColor: 'rgb(35, 104, 217)',
                data: data['1'].values,
                fill: this.getGType(data['type'])
            }
        );}
        if(data['2']!=undefined){
        config_data.datasets.push(
            {
                label: data['2'].name,
                backgroundColor: 'rgb(58, 115, 48)',
                borderColor: 'rgb(66, 230, 37)',
                data: data['2'].values,
                fill: this.getGType(data['type'])
            }
        );}
        if(data['3']!=undefined){
        config_data.datasets.push(
            {
                label: data['3'].name,
                backgroundColor: 'rgb(97, 90, 42)',
                borderColor: 'rgb(191, 170, 11)',
                data: data['3'].values,
                fill: this.getGType(data['type'])
            }
        );}
        const config = {
            type: this.getGraphType(data['type']),
            data: config_data,
            options: {}
        };
        this.func(config);
    }

    //set graph type
    getGraphType=(grrr)=>{
        if(grrr == 0) return "line";
        if(grrr == 1) return "bar";
        if(grrr == 2) return "line";
    }

    //set graph type, used when type is area
    getGType=(grrr)=>{
        if(grrr == 2) return "origin";
        else return "false";
    }

    //remove loader
    removeChild=()=>{
        let mn = document.getElementById("mm_ll");
        while(mn.lastChild)
            mn.removeChild(mn.lastChild);
    }

    //add loading circle
    addLoad=()=>{
        let mn = document.getElementById("mm_ll");
        let nn = document.createElement('div');
        ReactDOM.render(<Loader/>,nn);
        mn.appendChild(nn);
    }

    //remove old graph
    func=(config)=>{
        const elem = document.getElementById("graph_instance");
        this.state.cur_chart = new Chart(
            elem,
            config
        );
        this.removeChild();
    }

    //return hmtl text
    render() {
        let self = this;
        return (
            <div id="graph_parrent" className='d-flex flex-column justify-content-center align-items-center'>
                <div style={{width: 800, height: 400}}>
                    <canvas id="graph_instance" />
                    <div id="mm_ll"/>
                </div>

                <div className='p-2'>
                    <input type="button" className='btn btn-primary fs-5' onClick={this.load_data} value="Generovať graf"/>
                </div>
            </div>
        );
    }
}
export default GraphItself;
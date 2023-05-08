/**
 * author: xlukac16
 * component: CompanyModalGraph
 * view: Company - Graph modal
 */

import axios from 'axios';
import React,{ Component } from 'react';
import Chart from 'chart.js/auto';

// Class component - this component is used in company view, for showing usage history of selected medicine
class CompanyModalGraph extends Component{

    constructor(props){
        super(props);

        this.state = {
            curChart: "Nope"
        }
    }
    componentDidMount(){
        this.props.func(this.myFunc);
    }

    //Generate graph
    myFunc = async(id)=>{
        
        const elem = document.getElementById("graph_instance");
        //console.log(this.state.curChart)
        if(this.state.curChart != "Nope") this.state.curChart.destroy();
        


        let varia = await axios.get("/home/get/company_meds/graph/"+id);
        
        this.state.name = varia.data['name'];
        let config_data  = {
            labels: varia.data['dates'],
            datasets: [{
                label: varia.data['name'],
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: varia.data['values'],
                fill: 'false'
            }]
        };

        const config = {
            type: 'line',
            data: config_data,
            options: {}
        };

        this.state.curChart = new Chart(
            elem,
            config
        );
    }

    //return html text
    render(){
        return(
            <div class="modal fade" id="comp_modal" tabindex="-1" aria-labelledby="tag_modal_label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="tag_modal_label">{this.state.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">


                            <div>
                                <div  width="600px" height="300px" overflow-y="scroll">
                                    <canvas id="graph_instance" />
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyModalGraph;
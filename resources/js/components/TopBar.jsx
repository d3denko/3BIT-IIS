/**
 * author: xlukac16
 * component: TopBar
 * view: All views
 */

import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

// Class component - this component is a topbar in all views
class TopBar extends Component{

constructor(props){
    super(props);

    this.state = {
        type: 0,
        id: null
    };
    this.GetType();
}

//get user type
GetType=()=>{
    let self = this;
    axios.get('/home/get/user/type').then(function(response){
        self.setState({
            type: response.data
        });
    });
}

//return html text
render(){
    //Pacient
    if(this.state.type == 0){
    return (
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link fs-5" href="/home/moja_liecba">Moja liečba<span class="sr-only"></span></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link fs-5" href="/home/o_chorobe">O chorobe</a>
                </li>
            </ul>
        );
    }
    //Doktor
    else if(this.state.type == 1){
        return (
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link fs-5" href="/home/prehlad_pacientov">Prehľad pacientov<span class="sr-only"></span></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link fs-5" href="/home/tvorba_grafov">Tvorba grafov</a>
                </li>
            </ul>
        );
    }
    //Firma
    else if(this.state.type == 2){
        return (
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link fs-5" href="/home/prehlad_firma">Základné informácie<span class="sr-only"></span></a>
                </li>

                <li class="nav-item active">
                    <a class="nav-link fs-5" href="/home/vytvorit_graf">Vytvoriť graf<span class="sr-only"></span></a>
                </li>
            </ul>
        );
    }
    //Admin
    else if(this.state.type == 3){
        return (
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link fs-5" href="/home/prehlad_doktorov">Prehľad doktorov<span class="sr-only"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fs-5" href="/home/prehlad_firiem">Prehľad firiem</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fs-5" href="/home/prehlad_liekov">Prehľad liekov</a>
                </li>
            </ul>
        );
    }
}
}
export default TopBar;

if (document.getElementById('topbar')) {
ReactDOM.render(<TopBar />, document.getElementById('topbar'));
}
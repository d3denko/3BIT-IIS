/**
 * author: xhoril01
 * component: PatientImg
 * view: Doctor view, patient detail
 */

import React,{ Component } from 'react';
import logoG from '../../../public/img/girl_icon.png'
import logoM from '../../../public/img/men_icon.jpeg'

// Class component - this component is an image of patient in doctor view patient detail
class PatientImg extends Component{

    constructor(props){
        super(props);
    }

    //return html text
    render(){
        if(this.props.gender === 'Female')
            return(
                <img src={logoG} class="rounded-circle" height='300' width='300' alt="logoG"></img>
            );

        else
            return(
                    <img src={logoM} class="rounded-circle" height='300' width='300' alt="logoM"></img>
                );
        }
}

export default PatientImg;
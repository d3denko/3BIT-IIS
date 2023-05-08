/**
 * author: xlukac16
 * component: Getter
 * view: Doctor and company view, graph creator
 */

import { Component } from 'react';

// Class component - this component is a loading circle, graph generation takes a while
class Loader extends Component
{
    constructor(props)
    {
        super(props);
    }

    //return html text
    render(){
        return(
            <div className='text-center'>
                <div id="my_load_icon" className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Načítavanie...</span>
                </div>
            </div>
        );
    }
}

export default Loader;
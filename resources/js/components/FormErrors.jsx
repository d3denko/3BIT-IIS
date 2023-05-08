import React,{ Component } from 'react';

class FormErrors extends Component{
      
    constructor(props){
        super(props);
    }

    checkMsg(){
        
        value = Object.values(this.props.data);
        console.log(value);
        if(value != '') 
            return (
                <p className='text-danger fs-5'>{ value }</p>
            );
    }

    render() {
        return(
                <div>
                    {this.checkMsg}
                </div>
        );
    }
}

export default FormErrors;
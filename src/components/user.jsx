import React from 'react';

export default class User extends React.PureComponent{

    render(){ 
        var userName = '';

        if(this.props.params)
        {
            userName = this.props.params.userName;
        }                 
        else{
            userName = this.props.userName;
        }
        return(  
            <div style={{margin:'20px', height:'300px', width:'150px'}}>
                <div style={{height:'200px', width:'150px', borderStyle:'solid'}}>
                </div>
                <p style={{textAlign:'center'}}>{userName}</p>
            </div>                                                       
        );
    }
};
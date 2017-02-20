import React from 'react';

export default class User extends React.PureComponent{
    render(){ 

        return(  
            <div style={{margin:'20px', height:'300px', width:'150px'}}>
                <div style={{height:'200px', width:'150px', borderStyle:'solid'}}>
                    {this.props.cardValue}
                </div>
                <p style={{textAlign:'center'}}>{this.props.userName}</p>
            </div>                                                       
        );
    }
};
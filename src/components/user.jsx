import React from 'react';

const cardStyle = {
    fontSize:'10em',
    borderStyle:'solid',
    borderRadius:'10px',
    textAlign:'center',
    height:'220px',
    width:'160px'
}

export default class User extends React.PureComponent{
    render(){ 
        return( 
            <div style={{marginTop:'20px', height:'300px', width:'170px'}}>
                <div style={cardStyle}>
                    <span>{this.props.cardValue}</span>
                </div>
                <p style={{textAlign:'center'}}>{this.props.userName}</p>
            </div>                                                       
        );
    }
};
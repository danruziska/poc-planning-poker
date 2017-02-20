import React from 'react';

const cardStyle = {
    position:'relative',
    fontSize:'10em',
    borderStyle:'solid',
    borderRadius:'10px',
    textAlign:'center',
    height:'220px',
    width:'170px'
}

export default class User extends React.PureComponent{
    render(){ 
        return( 
            <div style={{margin:'20px', height:'300px', width:'150px'}}>
                <div style={cardStyle}>
                    <span>{this.props.cardValue}</span>
                </div>
                <p style={{textAlign:'center'}}>{this.props.userName}</p>
            </div>                                                       
        );
    }
};
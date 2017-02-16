import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';

export default class ActionChoice extends React.PureComponent{

    render(){
        var containerStyle = {
            margin: 30,
            textAlign: "center"  
        };
        return(
            <div style={containerStyle}>
                <RaisedButton label="New Table" buttonStyle={{backgroundColor:defaultButton.backgroundColor}} labelStyle={{color:defaultButton.color}} />
                <RaisedButton label="Join Table" buttonStyle={{backgroundColor:defaultButton.backgroundColor}} labelStyle={{color:defaultButton.color}} />
            </div>              
        );
    }
};
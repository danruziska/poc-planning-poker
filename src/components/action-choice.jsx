import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
import { alternateButton } from '../styles/ui-components/button';

export default class ActionChoice extends React.PureComponent{
    
    render(){
        var buttonStyle = {
            backgroundColor: defaultButton.backgroundColor,          
        };

        var labelStyle = {
            color: defaultButton.color
        }

        var alternateButtonStyle = {
            backgroundColor: alternateButton.backgroundColor,          
        };

        var alternateLabelStyle = {
            color: alternateButton.color
        }

        return(
            <div>
                <RaisedButton label="New Table" buttonStyle={buttonStyle} labelStyle={labelStyle} />
                <RaisedButton label="Join Table" buttonStyle={alternateButtonStyle} labelStyle={alternateLabelStyle} />  
            </div>              
        );
    }
};
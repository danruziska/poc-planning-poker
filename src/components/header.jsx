import React from 'react';
import AppBar from 'material-ui/AppBar';
import { primaryColors } from '../styles/base/system-colors';

export default class Header extends React.PureComponent{
    render(){         
        var componentStyle = {
            backgroundColor: primaryColors.primaryBackground,
            color:primaryColors.primaryTextColor                                 
        };    

        var roomIdStyle = {
            color: primaryColors.primaryTextColor
        }
        
        return(
            <AppBar title="React Header"        
                style={componentStyle}
                titleStyle={componentStyle}    
                showMenuIconButton={false}  
                iconElementRight={<p style={roomIdStyle}>Room ID: {this.props.roomId}</p>}      
            />      
        );
    }
};
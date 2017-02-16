import React from 'react';
import AppBar from 'material-ui/AppBar';
import { primaryColors } from '../styles/base/system-colors';

export default class Header extends React.PureComponent{
    render(){         
        var componentStyle = {
            backgroundColor: primaryColors.primaryBackground            
        };    
        
        return(
            <AppBar title="React Header"        
                style={componentStyle}  
                iconClassNameRight="muidocs-icon-navigation-expand-more"                
            />      
        );
    }
};
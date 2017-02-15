import React from 'react';
import AppBar from 'material-ui/AppBar';

export default class Header extends React.PureComponent{
    render(){
        return(
            <AppBar title="React Header"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                
            />      
        );
    }
};
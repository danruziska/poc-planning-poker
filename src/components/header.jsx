import React from 'react';
import AppBar from 'material-ui/AppBar';
import classnames from 'classnames';

export default class Header extends React.PureComponent{
    render(){
        let componentClass = classnames('header-component');
        return(
            <AppBar title="React Header"
                className={componentClass}
                iconClassNameRight="muidocs-icon-navigation-expand-more"                
            />      
        );
    }
};
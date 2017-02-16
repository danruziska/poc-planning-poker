import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { primaryColors } from '../styles/base/system-colors';

export default class Header extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state ={
            tableId:" "
        }
    }

    render(){         
        var componentStyle = {
            backgroundColor: primaryColors.primaryBackground            
        };    
        
        return(
            <AppBar title="React Header"        
                style={componentStyle}             
                iconElementRight={<FlatButton label={this.state.tableId} />}      
            />      
        );
    }

    updateId(newTableId){
        this.setState({tableId: newTableId});
    }
};
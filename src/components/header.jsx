import React from 'react';
import AppBar from 'material-ui/AppBar';
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
            backgroundColor: primaryColors.primaryBackground,
            color:primaryColors.primaryTextColor                                 
        };    

        var tableIdStyle = {
            color: primaryColors.primaryTextColor
        }
        
        return(
            <AppBar title="React Header"        
                style={componentStyle}
                titleStyle={componentStyle}    
                showMenuIconButton={false}  
                iconElementRight={<p style={tableIdStyle}>{this.state.tableId}</p>}      
            />      
        );
    }

    updateId(newTableId){
        this.setState({tableId: newTableId});
    }
};
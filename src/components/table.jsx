import React from 'react';
import Header from '../components/header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Table extends React.PureComponent{
    componentDidMount(){
        this._child.updateId(this.props.params.tableId);
    }

    render(){                  
        return(            
            <MuiThemeProvider> 
                <div>
                    <Header ref={(child) => { this._child = child }} />
                </div>               
            </MuiThemeProvider>            
        );
    }
};
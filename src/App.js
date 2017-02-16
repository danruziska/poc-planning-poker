import React, { Component } from 'react';
import './App.css';
import Header from '../src/components/header';
import ActionChoice from '../src/components/action-choice';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
            <Header />
            <ActionChoice />
        </div>   
      </MuiThemeProvider>  
    );
  }
}

injectTapEventPlugin();

export default App;

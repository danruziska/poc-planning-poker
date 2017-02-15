import React, { Component } from 'react';
import './App.css';
import Header from '../src/components/header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
            <Header />
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>   
      </MuiThemeProvider>  
    );
  }
}

injectTapEventPlugin();

export default App;

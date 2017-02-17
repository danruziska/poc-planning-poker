import React, { Component } from 'react';
import './App.css';
import Header from '../src/components/header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {

  constructor() {
    super();
    this.state = {
      roomId : ""
    }
    this.updateRoomId = this.updateRoomId.bind(this)
  }

  updateRoomId(newRoomId){
    this.setState({roomId:newRoomId});
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child,{
          updateRoomId: this.updateRoomId
      })
    );
    return (
      <MuiThemeProvider>
        <div>
            <Header roomId={this.state.roomId}  />            
            <div>
              {childrenWithProps}
            </div>
        </div>   
      </MuiThemeProvider>  
    );
  }
}

injectTapEventPlugin();

export default App;

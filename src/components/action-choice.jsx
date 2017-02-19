import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
import { actionChoiceTextField } from '../styles/ui-components/textfield';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import { randomString } from '../utils/randomString';

const {Grid, Row, Col} = require('react-flexbox-grid');
const io = require('socket.io-client');
const socket = io('http://localhost:3001');
const uuidV4 = require('uuid/v4');

export default class ActionChoice extends React.PureComponent{
    constructor() {
        super();
        this.state = {
            roomIdField : '',
            randomValue:randomString(),
            user:{
                id:'',
                name:'Danilo'
            }
        };
        this.teste2 = this.teste2.bind(this);
    }

    handleTextFieldChange = (event) => {
         this.setState({
            roomIdField: event.target.value,
        });
    }

    generateRoom = (event) => {
        this.setState({
            randomValue: randomString()
        });
    }

    teste2(){
        var uuid = uuidV4();
        console.log('emitindo evento join-room: ' + this.state.roomIdField);
        this.setState({
            user:{
                id: uuid,
                name:'Danilo'
            }
        });
        socket.emit('join-room', this.state.user,this.state.roomIdField);
    }

    render(){  
        var columnStyle = {
            textAlign:'center'
        };
        

        return(
            <Grid>
                <Row style={{marginTop:'40px'}}>
                    <Col style={columnStyle}>
                        <Link to={"/room/" + this.state.randomValue}>
                            <RaisedButton label="New Room" 
                                onClick={this.generateRoom}
                                buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                                labelStyle={{color:defaultButton.color}}
                            />   
                        </Link>
                    </Col>                    
                </Row>
                <Row style={{margin:'10px'}}>                  
                    <Col style={columnStyle}>     
                        <TextField  
                                    value={this.state.roomIdField}
                                    onChange={this.handleTextFieldChange}
                                    floatingLabelFocusStyle={{color:actionChoiceTextField.color}}
                                    underlineFocusStyle={{borderBottomColor :actionChoiceTextField.color}}
                                    floatingLabelText="Code"
                        />                   
                        <RaisedButton label="Join Room" 
                                    style={{marginLeft:'10px'}} 
                                    buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                                    labelStyle={{color:defaultButton.color}} 
                                    onClick={this.teste2}
                        />
                    </Col>                                        
                </Row>                                
            </Grid>              
        );
    }
};
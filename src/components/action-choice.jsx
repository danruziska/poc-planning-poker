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

export default class ActionChoice extends React.PureComponent{
    render(){  
        var key = 1; 
        var user = {
            id: key,
            name: 'Danilo'
        }

        function teste2(){
            console.log('emitindo evento...');
            socket.emit('user-joined', user);
            key++;
        }

        var columnStyle = {
            textAlign:'center'
        };
        var randomValue = randomString();

        return(
            <Grid>
                <Row style={{marginTop:'40px'}}>
                    <Col style={columnStyle}>
                        <Link to={"/room/" + randomValue}>
                            <RaisedButton label="New Room" 
                                buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                                labelStyle={{color:defaultButton.color}}
                            />   
                        </Link>
                    </Col>                    
                </Row>
                <Row style={{margin:'10px'}}>                  
                    <Col style={columnStyle}>     
                        <TextField  floatingLabelFocusStyle={{color:actionChoiceTextField.color}}
                                    underlineFocusStyle={{borderBottomColor :actionChoiceTextField.color}}
                                    floatingLabelText="Code"
                        />                   
                        <RaisedButton label="Join Room" 
                                    style={{marginLeft:'10px'}} 
                                    buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                                    labelStyle={{color:defaultButton.color}} 
                                    onClick={teste2}
                        />
                    </Col>                                        
                </Row>                                
            </Grid>              
        );
    }
};
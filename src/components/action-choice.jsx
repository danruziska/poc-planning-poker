import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
import { actionChoiceTextField } from '../styles/ui-components/textfield';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import { randomString } from '../utils/randomString';

const {Grid, Row, Col} = require('react-flexbox-grid');


export default class ActionChoice extends React.PureComponent{

    render(){    
        var columnStyle = {
            textAlign:'center'
        };
        var randomValue = randomString();

        return(
            <Grid>
                <Row style={{marginTop:'40px'}}>
                    <Col style={columnStyle}>
                        <Link to={"/table/" + randomValue}>
                            <RaisedButton label="New Table" 
                                buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                                labelStyle={{color:defaultButton.color}}
                            />   
                        </Link>
                    </Col>                    
                </Row>
                <Row style={{margin:'10px'}}>                  
                    <Col style={columnStyle}>     
                        <TextField    floatingLabelFocusStyle={{color:actionChoiceTextField.color}}
                                    underlineFocusStyle={{borderBottomColor :actionChoiceTextField.color}}
                                    floatingLabelText="Code"
                        />                   
                        <RaisedButton label="Join Table" 
                                    style={{marginLeft:'10px'}} 
                                    buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                                    labelStyle={{color:defaultButton.color}} 
                        />
                    </Col>                                        
                </Row>                                
            </Grid>              
        );
    }
};
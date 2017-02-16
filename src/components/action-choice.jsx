import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
import TextField from 'material-ui/TextField';

const {Grid, Row, Col} = require('react-flexbox-grid');


export default class ActionChoice extends React.PureComponent{

    render(){
        return(
            <Grid>
                <Row style={{marginTop:'40px'}}>
                    <Col style={{textAlign:'center'}}>
                        <RaisedButton label="New Table" buttonStyle={{backgroundColor:defaultButton.backgroundColor}} labelStyle={{color:defaultButton.color}} />                                               
                    </Col>                    
                </Row>
                <Row style={{margin:'10px'}}>                  
                    <Col style={{textAlign:'center'}}>     
                        <TextField floatingLabelFocusStyle={{color:'red'}}
                            underlineFocusStyle={{borderBottomColor :'red'}}
                            floatingLabelText="Code"
                        />                   
                        <RaisedButton label="Join Table" style={{marginLeft:'10px'}} buttonStyle={{backgroundColor:defaultButton.backgroundColor}} labelStyle={{color:defaultButton.color}} />
                    </Col>                                        
                </Row>                                
            </Grid>              
        );
    }
};
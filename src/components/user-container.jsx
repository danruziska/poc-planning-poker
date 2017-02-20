import React from 'react';
import User from './user';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from '../stylesheets/cards.css';
const {Grid, Row, Col} = require('react-flexbox-grid');

const Swipeable = require('react-swipeable');
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

export default class UserContainer extends React.PureComponent{

    constructor() {
        super();
        this.state = {
            cardValue:'1',
            user:{
                id:'',
                name:''
            },
            roomId:'',
            animationClass:''
        }
        this.sendCard = this.sendCard.bind(this);
        this.swipedUp = this.swipedUp.bind(this);
        this.resetCard = this.resetCard.bind(this);
    }

    componentDidMount(){
        this.setState({
            user:{
                id: this.props.location.query.userId,
                name: this.props.params.userName
            },
            roomId:this.props.location.query.roomId
        })
    }

    handlecardValueChange = (event) =>{
        this.setState({
            cardValue:event.target.value
        });
    }

    sendCard(){
        socket.emit('send-card',this.state.user,this.state.roomId, this.state.cardValue);
    }

    resetCard(){
        this.setState({
            animationClass:''
        });
    }

    handleChange = (event, index, value) => this.setState({cardValue:value});

    swipedUp(){
        this.setState({
            animationClass:'cardthrown'
        }, function(){
            this.sendCard();
        });
    }

    render(){         
        return(  
                <Grid>
                    <Row>
                        <Col>
                            <Swipeable onSwipedUp={this.swipedUp}>  
                                <div className={this.state.animationClass}>
                                    <User cardValue={this.state.cardValue} userName={this.props.params.userName} />                     
                                </div>                                      
                            </Swipeable>  
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SelectField
                                floatingLabelText="Card Value"
                                value={this.state.cardValue}
                                onChange={this.handleChange}
                                style={styles.customWidth}
                            >
                                <MenuItem value={1} primaryText="1" />
                                <MenuItem value={2} primaryText="2" />
                                <MenuItem value={3} primaryText="3" />
                                <MenuItem value={5} primaryText="5" />
                                <MenuItem value={8} primaryText="8" />
                                <MenuItem value={13} primaryText="13" />
                                <MenuItem value={20} primaryText="20" />
                                <MenuItem value={40} primaryText="40" />
                            </SelectField> 
                        </Col>                        
                    </Row>
                    <Row>
                        <Col>
                            <RaisedButton label="Reset" 
                                buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                                labelStyle={{color:defaultButton.color}} 
                                onClick={this.resetCard}
                            />
                        </Col>
                    </Row>
                </Grid>                                                                                         
        );
    }
};
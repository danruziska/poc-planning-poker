import React from 'react';
import User from './user';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from '../stylesheets/cards.css';
const {Grid, Row, Col} = require('react-flexbox-grid');


const Swipeable = require('react-swipeable');
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

const values = [
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40'
]

export default class UserContainer extends React.PureComponent{

    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            cardValue:values[0],
            user:{
                id:'',
                name:''
            },
            roomId:'',
            animationClass:''
        }
        this.sendCard = this.sendCard.bind(this);
        this.swipedUp = this.swipedUp.bind(this);
        this.swipedRight = this.swipedRight.bind(this);
        this.swipedLeft = this.swipedLeft.bind(this);
        this.resetCard = this.resetCard.bind(this);        
    }

    componentDidMount(){
        this.setState({
            user:{
                id: this.props.location.query.userId,
                name: this.props.params.userName
            },
            cardValue:'1',
            roomId:this.props.location.query.roomId
        });

        socket.on('reset-card',()=> 
        {
            console.log('resetar cartas');
            this.resetCard();
        });    

        socket.emit('room', this.props.location.query.roomId); 
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
            animationClass:'',
            cardValue:'1'
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

    swipedRight(){        
        var newIndex = this.state.currentIndex;
        if(newIndex !== values.length-1){
            newIndex+=1;
            this.setState({
                currentIndex : newIndex,
                cardValue: values[newIndex]
            });
        }
    }

    swipedLeft(){
        var newIndex = this.state.currentIndex;
        if(newIndex !== 0){
            newIndex-=1;
            this.setState({
                currentIndex : newIndex,
                cardValue: values[newIndex]
            });
        }   
    }

    render(){    
        return(  
                <Grid>
                    <Row>
                        <Col>
                            <Swipeable onSwipedUp={this.swipedUp} onSwipedRight={this.swipedRight} onSwipedLeft={this.swipedLeft} >  
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
                </Grid>                                                                                         
        );
    }
};
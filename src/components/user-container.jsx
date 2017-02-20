import React from 'react';
import User from './user';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

export default class UserContainer extends React.PureComponent{

    constructor() {
        super();
        this.state = {
            cardValue:'',
            user:{
                id:'',
                name:''
            },
            roomId:''
        }
        this.sendCard = this.sendCard.bind(this);
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
        // var uuid = uuidV4();
        // this.setState({
        //     user:{
        //         id: uuid,
        //         name:this.state.user.name
        //     }
        // }, function(){
        //     console.log('user id: ' + this.state.user.id);
        //     socket.emit('join-room', this.state.user,this.state.roomIdField);
        //     browserHistory.push('/user/' + this.state.user.name);
        // });
        socket.emit('send-card',this.state.user,this.state.roomId, this.state.cardValue);
    }

    render(){ 
        return(  
            <div>
                <User cardValue={this.state.cardValue} userName={this.props.params.userName} />
                <input type="text" onChange={this.handlecardValueChange} />
                <RaisedButton label="Send" 
                    buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                    labelStyle={{color:defaultButton.color}} 
                    onClick={this.sendCard}
                />
            </div>                                                       
        );
    }
};
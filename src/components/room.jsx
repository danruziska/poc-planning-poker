import React from 'react';
import User from './user';
const {Grid, Row, Col} = require('react-flexbox-grid');
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
const io = require('socket.io-client');
const socket = io('https://poc-planning-poker-api.herokuapp.com/');

export default class Room extends React.PureComponent{    
    constructor() {
        super();
        this.state = {
            users : [],
            totalOfParticipants:0,
            totalUsersInRoom:0
        }
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.resetRoom = this.resetRoom.bind(this);
    }

    componentDidMount(){
       this.props.updateRoomId(this.props.params.roomId);

        socket.on('user-joined',(userData, socketId)=> 
        {
            console.log('user: ' + userData.name + ' socketId: ' + socketId);
            this.addUser(userData, socketId);
        });

        socket.on('card-sent',(user,cardValue)=>
        {
            this.updateUser(user,cardValue);                            
        });
        socket.emit('room', this.props.params.roomId);

        socket.on('socket-disconnected', (socketId) =>
        {
            var updatedArray = this.state.users.slice();
            for(var i=0;i<updatedArray.length;i++){
                if(updatedArray[i].socketId === socketId){
                    updatedArray.splice(i,1);
                    break;
                }
            } 
            this.setState({
                users: updatedArray
            });
        });     
    }

    addUser(newUser, socketId){
        var newUserArray = this.state.users.slice();
        newUser.socketId = socketId;
        newUserArray.push(newUser);
        this.setState({
           users: newUserArray,
           totalUsersInRoom:newUserArray.length
        });
    } 

    resetRoom(){
        var updatedArray = this.state.users.slice();
        for(var j=0;j<updatedArray.length;j++){
            updatedArray[j].cardValue = '?'
            updatedArray[j].newValue = '?'
        } 
        this.setState({
            users: updatedArray,
            totalUsersInRoom: this.state.users.length,
            totalOfParticipants:0
        });
        socket.emit('reset-card', this.props.params.roomId);
    }  

    updateUser(user, cardValue){
        var newArray = this.state.users.slice();
        for(var i=0;i<newArray.length;i++){
            if(newArray[i].id === user.id){
                newArray[i].newValue = cardValue;
                newArray[i].cardValue = 'R';
            }
        }
        var total = this.state.totalOfParticipants;
        total+=1;
        this.setState({
            users: newArray,
            totalOfParticipants: total                                                                                                                                                                                           
        });    

        if(this.state.totalUsersInRoom === this.state.totalOfParticipants){
            console.log('atualizar todos');
            var updatedArray = this.state.users.slice();
            for(var j=0;j<updatedArray.length;j++){
                updatedArray[j].cardValue = updatedArray[j].newValue.toString();
            } 
            this.setState({
                users: updatedArray,
            });
        }   
    }

    handleTotalParticipantsChange = (event) => {
         this.setState({
            totalOfParticipants: event.target.value,
        });
    }
    
    render(){           
        const usersList = this.state.users.map((user) =>
            <Col key={user.id} is="3 tablet-4 phone-4"><User userName={user.name} cardValue={user.cardValue} /></Col>
        );
    
        return(   
            <div>                
                <Grid>
                    <Row is="center">
                        {usersList}                                                
                    </Row>
                </Grid>
                <RaisedButton label="Reset" 
                    style={{marginLeft:'10px'}} 
                    buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                    labelStyle={{color:defaultButton.color}} 
                    onClick={this.resetRoom}
                />
            </div>                                
        );
    }
};
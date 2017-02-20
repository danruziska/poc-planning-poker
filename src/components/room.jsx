import React from 'react';
import User from './user';
import { Grid, Row, Cell } from 'react-inline-grid';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultButton } from '../styles/ui-components/button';
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

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

        socket.on('user-joined',(userData)=> 
        {
            this.addUser(userData);
        });

        socket.on('card-sent',(user,cardValue)=>
        {
            this.updateUser(user,cardValue);                            
        });
        socket.emit('room', this.props.params.roomId);
    }

    addUser(newUser){
        var newUserArray = this.state.users.slice();
        newUserArray.push(newUser);
        this.setState({
           users: newUserArray
        });

        this.setState({
            totalUsersInRoom:this.state.users.length
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
            <Cell key={user.id} is="3 tablet-4 phone-4"><User userName={user.name} cardValue={user.cardValue} /></Cell>
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
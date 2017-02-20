import React from 'react';
import User from './user';
import { Grid, Row, Cell } from 'react-inline-grid';
const io = require('socket.io-client');
const socket = io('http://localhost:3001');
import TextField from 'material-ui/TextField';
import { actionChoiceTextField } from '../styles/ui-components/textfield';

export default class Room extends React.PureComponent{    
    constructor() {
        super();
        this.state = {
            users : [],
            totalOfParticipants:0
        }
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
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
           users: newUserArray,
           totalOfParticipants: this.state.totalOfParticipants++
        });
    }   

    updateUser(user, cardValue){
        var newArray = this.state.users.slice();
        for(var i=0;i<newArray.length;i++){
            if(newArray[i].id === user.id){
                newArray[i].newValue = cardValue;
            }
        }
        this.setState({
            users: newArray                                                                                                                                                                                              
        });    

        if(this.state.users.length === this.state.totalOfParticipants){
            console.log('atualizar todos');
            var updatedArray = this.state.users.slice();
            for(var j=0;j<updatedArray.length;j++){
                updatedArray[j].cardValue = updatedArray[j].newValue.toString();
            } 
            this.setState({
                users: updatedArray
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
                        <Cell>
                            {usersList}     
                        </Cell>                                              
                    </Row>
                </Grid>
                <TextField  
                    value={this.state.totalOfParticipants}
                    onChange={this.handleTotalParticipantsChange}
                    floatingLabelFocusStyle={{color:actionChoiceTextField.color}}
                    underlineFocusStyle={{borderBottomColor :actionChoiceTextField.color}}
                    floatingLabelText="Total of participants"
                />
            </div>                                
        );
    }
};
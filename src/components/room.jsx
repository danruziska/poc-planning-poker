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
            users : []
        }
        this.addUser = this.addUser.bind(this);
    }

    componentDidMount(){
       this.props.updateRoomId(this.props.params.roomId);

        socket.on('user-joined',(userData)=> 
        {
            console.log('novo usuário');
            this.addUser(userData);
        });

        console.log('emitindo evento room: ' + this.props.params.roomId);
        socket.emit('room', this.props.params.roomId);
    }

    addUser(newUser){
        console.log('chamou addUser ' + newUser);
        var newUserArray = this.state.users.slice();
        newUserArray.push(newUser);
        this.setState({
           users : newUserArray
        });
    }   
    
    render(){                                  
        const usersList = this.state.users.map((user) =>
            <Cell key={user.id} is="3 tablet-4 phone-4"><User userName={user.name} /></Cell>
        );
    
        return(   
            <div>
                <RaisedButton label="Add User" 
                              buttonStyle={{backgroundColor:defaultButton.backgroundColor}} 
                              labelStyle={{color:defaultButton.color}}                             
                            /> 
                <Grid>
                    <Row is="center">
                        {usersList}                                                
                    </Row>
                </Grid>
            </div>                                
        );
    }
};
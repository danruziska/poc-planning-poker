import React from 'react';

export default class Room extends React.PureComponent{
    componentDidMount(){
       this.props.updateRoomId(this.props.params.roomId);
    }

    render(){                  
        return(                         
            <div>
                <p>Sala</p>
            </div>
        );
    }
};
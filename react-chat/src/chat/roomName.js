import React from 'react';
import { Redirect } from "react-router-dom";

export class RoomName extends React.Component {

    state = {
        room: '',
        redirect: ''
    }
    componentDidMount() {
        if (sessionStorage.getItem('roomName')) {
            this.setState({ redirect: '/chat' })
        }
    }
    inputValue(val, event) {
        sessionStorage.setItem('roomName', event.target.value)
    }
    gotoChat = () => {
        if (sessionStorage.getItem('roomName')) {
            this.setState({ redirect: '/chat' })
        } else {
            alert("enter room name")
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (

            <div className='chat-app'>
                <label>room name</label>
                <input 
                onChange={(event) => this.inputValue('room', event)}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.gotoChat()
                    }
                }}
                ></input>
                <button onClick={this.gotoChat}> next</button>
            </div>
        );
    }
}
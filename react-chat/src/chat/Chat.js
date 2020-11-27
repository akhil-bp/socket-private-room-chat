import React from 'react';
// import './chat.scss';
import { Redirect } from "react-router-dom";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
var chats = []
export class Chat extends React.Component {

    state = {
        myId: this.randomString(5),
        chats: [],
        username: sessionStorage.getItem('userName'),
        room: sessionStorage.getItem('roomName'),
        msg: '',
        redirect: ''
    }
    socket;
    componentDidMount() {
        // if (!this.state.username && !this.state.room) {
        //     this.setState({ redirect: '/' })
        // } 
        console.log(sessionStorage.getItem('userName'))
        if (sessionStorage.getItem('userName') === null) {
            this.setState({ redirect: '/' })
        } else if (!this.state.room) {
            this.setState({ redirect: '/room' })
        }
        this.configureSocket();
        this.socket.on('send-message-to-clients', (response) => {
            chats.push(response)
            this.setState({ chats: chats })
            console.log(this.state.chats)
        })
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', (resp) => {
            console.log(resp)
            // socket.emit('createRoom','123')
            if (sessionStorage.getItem('roomName') !== null)
                socket.emit('joinRoom', sessionStorage.getItem('roomName'))
            else {
                socket.emit('joinRoom', 'room1')
            }
        });
        this.socket = socket;
    }
    randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

    handleSendMessage = () => {
        console.log(this.state.username, this.state.room)
        this.socket.emit('send-message', { u_id: this.state.myId, text: this.state.msg, senderName: this.state.username, id: Date.now(), room: this.state.room });

    }
    inputValue(val, event) {
        this.setState({ msg: event.target.value })
        // var theCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        // console.log(event)
        // if (theCode == 13) {
        //     this.handleSendMessage();
        // }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='chat-app'>
                {/* <label>user name</label><input onChange={(event) => this.inputValue('user', event)}></input>
                <br></br> */}
                <h3>Name : {this.state.username}  |  Room Name : {this.state.room}</h3>
                <input
                    placeholder="type texts here"
                    onChange={(event) => this.inputValue('msg', event)}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.handleSendMessage()
                        }
                    }}
                ></input>
                <button onClick={() => this.handleSendMessage()}>sent </button>
                {this.state.chats.map((val, i) => {
                    return <p key={i}>{val.u_id == this.state.myId ? 'Me' : val.senderName} : {val.text}</p>
                })
                }
            </div>
        );
    }
}
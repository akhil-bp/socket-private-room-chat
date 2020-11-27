import React from 'react';
import { Redirect } from "react-router-dom";

export class UserName extends React.Component {

    state = {
        username: '',
        redirect: ''
    }
    componentDidMount() {
        if (sessionStorage.getItem('userName')) {
            this.setState({ redirect: '/room' })
        }
    }
    inputValue(val, event) {
        sessionStorage.setItem('userName', event.target.value)
    }
    gotoChat = () => {
        if (sessionStorage.getItem('userName')) {
            this.setState({ redirect: '/room' })
        } else {
            alert("enter userName")
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (

            <div className='chat-app'>
                <label>user name</label>
                <input
                    onChange={(event) => this.inputValue('username', event)}
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
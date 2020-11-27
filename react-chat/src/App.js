
// import './App.css';

import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// const Home = lazy(() => import('./components/home'));
import { Chat } from './chat/Chat';
import { RoomName } from './chat/roomName';
import { UserName } from './chat/userName';
export default class App extends Component {

  render() {
    return (
      <Router>
        <Suspense fallback={<div>loading..</div>}>
          <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/room" component={RoomName} />
            <Route path="/" component={UserName} />
          </Switch>
        </Suspense>
      </Router>
    );

  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Room from './components/room';
import Home from './components/home';

ReactDOM.render(
  <Router history={browserHistory }>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/room/:roomId" component={Room} />
    </Route>
  </Router>,
  document.getElementById('root')
);
<<<<<<< HEAD
import React from 'react';
// import Canva from './components/Canva/';
import {Provider} from 'react-redux';

import Routes from './routes';
import store from './store';
import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

export default App;

import React from 'react';
// import Canva from './components/Canva/';
import {Provider} from 'react-redux';

import Routes from './routes';
import store from './store';

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
export default App;
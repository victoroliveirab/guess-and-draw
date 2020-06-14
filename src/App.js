import React, {Component} from 'react';
import Canva from './components/Canva';
import './App.css';

class App extends Component {
  
  state = {
    color: [255, 255, 255],
    delete: 0
  }


  getStyle = () => {
      return {
        padding: '100px'
      }
  }

  render() {
    return (
      <div>
        <Canva style={this.getStyle}></Canva>
      </div>
    );
  }
}

export default App;

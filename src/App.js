import React, {Component} from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './components/sketch';
import './App.css';

class App extends Component {
  
  state = {
    color: [255, 255, 255],
    delete: 0
  }

  randomColor = () => {
    this.setState({color:[
      Math.floor(Math.random()*255), 
      Math.floor(Math.random()*255), 
      Math.floor(Math.random()*255)]});
  }

  resetBkg = () => { 
      this.setState({delete: this.state.delete + 1,})
      console.log(this.state.delete)
  }

  render() {
    return (
      <div>
        <button onClick={this.randomColor}>Mudar Cor</button>
        <button onClick={this.resetBkg}>Apagar </button>
        <P5Wrapper sketch={sketch} color={this.state.color} del={this.state.delete}></P5Wrapper>
      </div>
    );
  }
}

export default App;

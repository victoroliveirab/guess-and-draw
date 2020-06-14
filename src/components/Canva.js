import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import SideMenu from './SideMenu';
import PropTypes from 'prop-types';

class Canva extends Component {

    state = {
        color: '#000000', 
        delete: 0
      }
    
      changeColor = (item) => {
          let color = item;
          this.setState({color: color})
      } 
    
      resetBkg = () => { 
          this.setState({delete: this.state.delete + 1,})
          console.log(this.state.delete)
      }

    render() {
        //console.log(this.data.color);
        return (
            <div>
                <P5Wrapper sketch={sketch} color={this.state.color} del={this.state.delete}></P5Wrapper>
                <div style= {{background: '#a6a6a6', width: '800px', overflow: 'auto'}}>
                    <SideMenu changeColor = {this.changeColor}/>
                    <button style={btnStyle} onClick={this.randomColor}>Reset</button>
                    <button style={btnStyle} onClick={this.resetBkg}>Apagar</button>
                </div>
            </div>
        )
    }
}

const btnStyle = {
    opacity: '1',
    padding: '20px 4%',
    cursor: 'pointer',
    color: '#000000'
}


export default Canva
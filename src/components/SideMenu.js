import React, { Component } from 'react';

class SideMenu extends Component{

    state = {
        colorButtons: [
            {
                id:1,
                name: 'black',
                style: {
                    border: 'none',
                    background: '#000000',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            },
            {
                id: 2,
                name: 'red',
                style: {
                    border: 'none',
                    background: '#ff0000',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            },
            {
                id: 3,
                name: 'blue',
                style: {
                    border: 'none',
                    background: '#1a1aff',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            },
            {
                id: 4,
                name: 'yellow',
                style: {
                    border: 'none',
                    background: '#ffff00',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            },
            {
                id: 5,
                name: 'green',
                style: {
                    border: 'none',
                    background: '#1aff1a',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            },
            {
                id: 6,
                name: 'pink',
                style: {
                    border: 'none',
                    background: '#ff4dd2',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            },
            {
                id: 7,
                name: 'brown',
                style: {
                    border: 'none',
                    background: '#663300',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            },
            {
                id: 8,
                name: 'white',
                style: {
                    border: 'none',
                    background: '#ffffff',
                    padding: '20px 4%',
                    cursor: 'pointer',
                }
            }
        ]
      }

    render(){
        return this.state.colorButtons.map((item) => (
            <button style = {item.style} key = {item.id} onClick={this.props.changeColor.bind(this, item.style.background)}></button>
        ));
    }
}

export default SideMenu;
import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import {params} from '../../themes';

class SideMenu extends Component {
  state = {
    colorButtons: [
      {
        id: 1,
        name: "black",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#000000",
          cursor: "pointer",
        },
      },
      {
        id: 2,
        name: "red",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#ff0000",
          cursor: "pointer",
        },
      },
      {
        id: 3,
        name: "blue",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#1a1aff",
          cursor: "pointer",
        },
      },
      {
        id: 4,
        name: "yellow",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#ffff00",
          cursor: "pointer",
        },
      },
      {
        id: 5,
        name: "green",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#1aff1a",
          cursor: "pointer",
        },
      },
      {
        id: 6,
        name: "pink",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#ff4dd2",
          cursor: "pointer",
        },
      },
      {
        id: 7,
        name: "brown",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#663300",
          cursor: "pointer",
        },
      },
      {
        id: 8,
        name: "background",
        style: {
          height:'40px',
          width:'100%',
          border:'2px solid',
          borderRadius: params.radius,
          background: "#f0f0f0",
          cursor: "pointer",
        },
      },
    ],
  };

  renderItem = (item) => (
    <Grid item xs={4} md={3} lg={12}>
      <Button
        onClick={this.props.changeColor.bind(this, item.style.background)}
        style={item.style}
        key={item.id}
      />
    </Grid>
  );

  render() {
    return (
      <Grid container spacing={3} justify='center' alignItems={'center'} direction={window.innerWidth > '1280' ? 'row' : 'column'}>
        {this.state.colorButtons.map((item) => this.renderItem(item))}
      </Grid>
    );
  }
}

export default SideMenu;

import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import SideMenu from "./SideMenu";
import { Grid, Button } from "@material-ui/core";

class Canva extends Component {
  state = {
    color: "#000000",
    delete: 0,
    reset: 0,
    eraser: 0,
    toggle: true
  };

  togggle = () => {
    this.setState({ toggle: !this.state.toggle})
  }

  changeColor = (item) => {
    let color = item;
    this.setState({ color: color });
  };

  deleteBkg = () => {
    this.setState({ delete: this.state.delete + 1 });
  };

  resetMove = () => {
    this.setState({ reset: this.state.reset + 1 });
  };

  render() {
    //console.log(this.data.color);
    return (
      <Grid container direction='row' spacing={2}>
        <Grid item xs={2}>
          <Grid container spacing={2} direction='column' justify='space-between'>
            <Grid item xs={12}>
              <SideMenu changeColor={this.changeColor} />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}> 
                    <Grid item xs={12}>
                        <Button variant='contained' style={btnStyle} onClick={this.resetMove}>
                            Reset
                        </Button>

                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' style={btnStyle} onClick={this.deleteBkg}>
                            Apagar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={10}>
          <P5Wrapper
            id = {'sketch'}
            mode = {this.togggle}
            sketch={sketch}
            color={this.state.color}
            del={this.state.delete}
            rst={this.state.reset}
          ></P5Wrapper>
        </Grid>
      </Grid>
    );
  }
}

const btnStyle = {
width:'100%',
  opacity: "1",
  padding: "20px 4%",
  cursor: "pointer",
  color: "#000000",
};

export default Canva;

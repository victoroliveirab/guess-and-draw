import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './Sketch';
import { Grid, Button } from '@material-ui/core'

class Canva extends Component {

    state = {
        color: [255, 255, 255],
        delete: 0
    }

    randomColor = () => {
        this.setState({
            color: [
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)]
        });
    }

    resetBkg = () => {
        this.setState({ delete: this.state.delete + 1, })
        console.log(this.state.delete)
    }

    styles = {
        button: {
            width:'100%'
        }
    }

    render() {
        //console.log(this.data.color);
        return (
            <Grid container  direction='column'>
                <Grid item xs={12}>
                    <Grid container direction='row' spacing='2'>
                        <Grid item xs={6}>
                            <Button
                            style={this.styles.button}
                            color='primary'
                            variant='outlined'
                            onClick={this.randomColor}>Mudar Cor</Button>

                        </Grid>

                        <Grid item xs={6}>
                            <Button
                            style={this.styles.button}
                            variant='outlined'
                            color='secondary' 
                            onClick={this.resetBkg}>Apagar</Button>

                        </Grid>

                    </Grid>

                </Grid>

                <Grid item xs={12}>
                        <P5Wrapper sketch={sketch} color={this.state.color} del={this.state.delete}></P5Wrapper>
                </Grid>

            </Grid>
        )
    }
}


export default Canva 
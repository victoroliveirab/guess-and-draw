import React from 'react';
import Grid from '@material-ui/core/Grid';

class View extends React.Component {
    render() {
        return (
            <Grid
                container
                spacing={3}
                direction='row'
                alignItems='center'
                justify='center'
                style={{position:'fixed',
                width:'100%',
                height:'100%',
                backgroundColor:'#c6c6c6',
                padding:0,
                margin:0}}>
                <Grid item xs={11} md={9} lg={8}>
                    {this.props.children}
                </Grid>
            </Grid>
        )
    }
};

export default View;
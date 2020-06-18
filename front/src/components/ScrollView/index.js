import React from 'react';
import { Grid } from '@material-ui/core';
import {params} from '../../themes';

export default class ScrollView extends React.PureComponent {
    render(){
        return(
            <Grid style={{overflowY:'hidden',overflowX:'hidden', borderRadius: params.radius}}>
                {this.props.children}
            </Grid>
        )
    }
};
//useless at the moment
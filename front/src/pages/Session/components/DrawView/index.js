import React from 'react';
import Canva from '../../../../components/Canva';
import {Card,CardContent, Grid} from '@material-ui/core'
import {params} from '../../../../themes';

class DrawView extends React.Component {

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
        return(
            <Card style={{backgroundColor:'#fff', borderRadius:params.radius}}>
                <CardContent>
                    <Grid container alignItems={'center'} justify={'center'}>
                        <Grid item xs={12}>
                            <Canva style={this.getStyle} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
};

export default DrawView;
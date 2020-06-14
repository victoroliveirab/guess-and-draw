import React from 'react';
import Canva from '../../../../components/Canva';
import {Card,CardContent} from '@material-ui/core'

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
            <Card>
                <CardContent>
                    <Canva style={this.getStyle} />
                </CardContent>
            </Card>
        )
    }
};

export default DrawView;
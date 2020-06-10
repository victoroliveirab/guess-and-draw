import React from 'react';
import Canva from '../../components/Canva';

class SessionPage extends React.Component {

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
        return (
            <>
                <Canva style={this.getStyle} />
            </>
        )
    }
}

export default SessionPage;
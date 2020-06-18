import React from 'react';
import DrawView from './components/DrawView';

import View from '../../components/View';
import PlayersBar from '../../components/PlayersBar';
import ChatCard from '../../components/Chat';
import ResponsesCard from '../../components/Responses';
import {Grid} from '@material-ui/core'
import { connect } from 'react-redux';

const playersMock = [
    {name:'ConcreteKite',points:210},
    {name:'Vitera',points:200},
    {name:'GEsu',points:100},
    {name:'Zexon',points:10},
    {name:'GiuDosLancher',points:5},
];

class SessionPage extends React.Component {
    render() {
        const {user} = this.props;
        console.log('Session', user);
        return (
            <View>
                <Grid container spacing={2} direction='row'>
                    <Grid item xs={12} md={12} lg={3}>
                        <PlayersBar players={playersMock} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={9} >
                        <Grid container spacing={2} direction='column'>
                            <Grid item xs={12}>
                                <DrawView />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2} direction='row'>
                                    <Grid item xs={12} lg={6}>
                                        <ResponsesCard />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <ChatCard />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid> 
                </Grid>
            </View>
        )
    }
};

const mapStateToProps = ({AuthReducer}) => ({
    ...AuthReducer
});

export default connect(mapStateToProps)(SessionPage);
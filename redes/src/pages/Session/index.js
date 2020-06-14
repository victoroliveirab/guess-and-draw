import React from 'react';
import DrawView from './components/DrawView';

import View from '../../components/View';
import PlayersBar from '../../components/PlayersBar';
import {Grid} from '@material-ui/core'

const playersMock = [
    {name:'ConcreteKite',points:210},
    {name:'Vitera',points:200},
    {name:'GEsu',points:100},
    {name:'Zexon',points:10},
    {name:'GiuDosLancher',points:5},
]

class SessionPage extends React.Component {
    render() {
        return (
            <View>
                <Grid container spacing={2} direction='row'>
                    <Grid item xs={12} md={4}>
                        <PlayersBar players={playersMock} />
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2} direction='column'>
                            <Grid item xs={12}>
                                <DrawView />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction='row'>
                                    <Grid item xs={6}>
                                        LIsta de Players
                                    </Grid>
                                    <Grid item xs={6}>
                                        Chat
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid> 
                </Grid>
            </View>
        )
    }
}

export default SessionPage;
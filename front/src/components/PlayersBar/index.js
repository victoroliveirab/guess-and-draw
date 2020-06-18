import React from 'react';
import {
    Grid,
    List,
    Typography,
    ListItem,
    Card,
    CardContent
} from '@material-ui/core'
import {params} from '../../themes';

export default function PlayersBar({ players }) {
    return (
        <Card style={{height:'100%', backgroundColor:'white', width:'100%', borderRadius:params.radius}}>
            <CardContent>
                <Grid container alignItems='center' justify='center'>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center'>Jogadores</Typography>
                    </Grid>
                    <Grid item>
                        {players.length ? (
                            <List>
                                {players.map((player, index) => (
                                    <ListItem alignItems='center' key={`player_${index}`}>
                                        <Typography align='center' variant='h6'>
                                            {player.name} - {player.points}pts
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <Typography style={{color:'#c9c9c9'}} variant='h5'>
                                    Sem jogadores!
                                </Typography>
                            )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};